import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleBooking } from "./lib/bookingHandler.js";

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function devBookingApi(env) {
  return {
    name: "dev-booking-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/booking") {
          next();
          return;
        }
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method === "GET") {
          const configured = Boolean(
            env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID,
          );
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ status: "ok", service: "booking", configured }));
          return;
        }
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          const body = await readRequestBody(req);
          const result = await handleBooking(body, {
            botToken: env.TELEGRAM_BOT_TOKEN ?? "",
            chatId: env.TELEGRAM_CHAT_ID ?? "",
          });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        } catch (err) {
          const status = typeof err.status === "number" ? err.status : 500;
          const message = status === 500 ? "Could not submit request" : err.message;
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: message }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), devBookingApi(env)],
  };
});
