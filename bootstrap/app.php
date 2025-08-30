<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\InjectLocaleData;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Pipeline\Pipeline;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            InjectLocaleData::class,
        ]);

        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if ($response->isNotFound() || $response->getStatusCode() === 429) {
                return app(Pipeline::class)
                    ->send($request)
                    ->through([
                        HandleAppearance::class,
                        HandleInertiaRequests::class,
                        AddLinkHeadersForPreloadedAssets::class,
                        InjectLocaleData::class,
                    ])
                    ->then(function ($request) use ($response) {
                        if ($response->isNotFound()) {
                            return Inertia::render('Errors/404', ['status' => $response->getStatusCode()])
                                ->toResponse($request)
                                ->setStatusCode($response->getStatusCode());
                        }
                        // handle 429 too many requests
                        if ($response->getStatusCode() === 429) {
                            return Inertia::render('Errors/429', ['message' => $response->getContent()])
                                ->toResponse($request)
                                ->setStatusCode($response->getStatusCode());
                        }
                    });
                // return Inertia::render('Errors/404', ['status' => $response->getStatusCode()])
                //     ->toResponse($request)
                //     ->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
    })->create();
