import axios from "axios";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});


api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;

api.interceptors.request.use((config) => {
    config.headers["X-CSRF-TOKEN"] = document.querySelector("meta[name='csrf-token']")?.getAttribute("content") || "";
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 419) {
            if (error.response.data?.message.includes('CSRF token mismatch.')) {
                toast.error("Your session has expired.", {
                    description: "Please refresh the page and try again.",
                });
                api.get('/sanctum/csrf-cookie');
            } else {
                toast.error("You are not allowed to do this.", {
                    description: error.response?.data?.message || "Please try again.",
                });
            }
            return Promise.reject();
        }

        if (error.response.status === 429) {
            toast.error("Too many requests.", {
                description: "Please wait for 1 minute and try again.",
                duration: 10000,
            });

            return Promise.reject();
        }

        if (error.response.status === 401) {
            toast.error("You are not logged in.", {
                icon: <ShieldAlert />,
                action: {
                    label: "Login",
                    onClick: () => router.visit(route("login")),
                },
            });

            return Promise.reject();
        }

        return Promise.reject(error);
    }
);

