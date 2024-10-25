import { Express, Request, Response } from "express";
import express from "express";

interface CustomerRegistrationRequest {
  handle: string;
  handle_type: string;
  receiver_client_id?: string | null;
}

export const configure = (app: Express) => {
  app.use(express.json());
  app.post("/handle", async (req: Request, res: Response) => {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const payload: CustomerRegistrationRequest = req.body;
    const response = await fetch("https://registry.versa.org/handle", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${clientId}:${clientSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      res.status(200).send("Successfully registered handle");
    } else {
      res.status(500).send("Failed to register handle");
    }
  });

  app.delete("/handle", async (req: Request, res: Response) => {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const payload: CustomerRegistrationRequest = req.body;
    const response = await fetch("https://registry.versa.org/handle", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${clientId}:${clientSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      res.status(200).send("Successfully deregistered handle");
    } else {
      res.status(500).send("Failed to deregister handle");
    }
  });
};
