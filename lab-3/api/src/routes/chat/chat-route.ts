import express, {NextFunction, Request, Response} from "express";
import {ChatService} from "@/services/chat";
import {ChatEventService} from '@/services/chat/chat-event-service';
import {IChatMessage} from "@/models/chat";

const chatRouter = express.Router();
const chatService = ChatService.getInstance();
const chatEventService = ChatEventService.getInstance();

/**
 * Get all messages
 * @returns messages
 */
chatRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await chatService.getMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a message
 * @param message
 * @returns created message following IChatMessage interface
 */
chatRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message: IChatMessage = await chatService.addMessage(req.body.message);
    res.json(message);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a message by id
 * @param id
 * @returns message
 */
chatRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await chatService.getMessage(req.params.id);
    res.json(message);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a message by id
 * @param id
 * @param message
 * @returns updated message
 */
chatRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await chatService.updateMessage(req.params.id, req.body.message);
    res.json(message);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a message by id
 * @param id
 * @returns deleted message
 */
chatRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = await chatService.deleteMessage(req.params.id);
    res.json(message);
  } catch (err) {
    next(err);
  }
});

/**
 * Get messages as server-sent events
 * @param clientId
 */
chatRouter.get("/events", (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.query.clientId as string;

  if (!clientId) {
    const error: any = new Error("clientId is required");
    error.status = 400;
    return next(error);
  }

  req.on("close", () => {
    chatEventService.removeClient(clientId);
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  chatEventService.addClient(clientId, res);
});

export{
  chatRouter
}