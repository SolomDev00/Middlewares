# **Middleware in NestJS vs Express.js**

Middleware is a fundamental concept in both **Express.js** and **NestJS**, allowing developers to intercept and modify HTTP requests and responses. Below is a structured comparison between the two frameworks.

---

## **1. What is Middleware?**

Middleware is a function that runs **before** the route handler. It can:

- Modify the request/response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

---

## **2. Middleware in Express.js**

Express.js provides a simple way to define middleware.

### **Example: Logging Middleware**

```javascript
const express = require("express");
const app = express();

// Middleware function
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
};

app.use(logger); // Apply globally

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### **Key Features in Express.js**

✅ **Simple Syntax** – Just a function with `req`, `res`, and `next`.  
✅ **Flexible Application** – Can be applied:

- **Globally** (`app.use()`)
- **Per Route** (`app.get("/path", middleware, handler)`)  
  ✅ **Third-party Middleware** – Like `morgan`, `helmet`, `cors`.

---

## **3. Middleware in NestJS**

NestJS builds on Express.js but provides a more structured approach using **Classes** and **Dependency Injection (DI)**.

### **Example: Logging Middleware**

```typescript
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  }
}
```

### **Applying Middleware in NestJS**

#### **Option 1: Module-level Middleware**

```typescript
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./logger.middleware";

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*"); // Apply to all routes
  }
}
```

#### **Option 2: Route-specific Middleware**

```typescript
consumer.apply(LoggerMiddleware).forRoutes("users"); // Only applies to `/users` routes
```

### **Key Features in NestJS**

✅ **Class-based** – Uses `@Injectable()` and `implements NestMiddleware`.  
✅ **Dependency Injection (DI)** – Can inject services into middleware.  
✅ **More Control** – Can exclude certain routes.  
✅ **Supports Functional Middleware** (like Express).

---

## **4. Comparison Table**

| Feature                    | Express.js                           | NestJS                      |
| -------------------------- | ------------------------------------ | --------------------------- |
| **Syntax**                 | Function-based (`(req, res, next)`)  | Class-based (`@Injectable`) |
| **Dependency Injection**   | ❌ No built-in DI                    | ✅ Supports DI              |
| **Global Application**     | `app.use(middleware)`                | `.forRoutes("*")`           |
| **Route Exclusion**        | ❌ Manual handling                   | ✅ `.exclude("admin")`      |
| **Third-party Middleware** | ✅ Works directly (`cors`, `helmet`) | ✅ Works but wrapped in DI  |

---

## **5. When to Use Which?**

| Use Case                  | Recommendation                |
| ------------------------- | ----------------------------- |
| **Simple APIs**           | Express.js (faster setup)     |
| **Enterprise Apps**       | NestJS (better structure)     |
| **Need DI in Middleware** | NestJS (cleaner DI)           |
| **Quick Prototyping**     | Express.js (less boilerplate) |

---

## **6. Conclusion**

- **Express.js** is **simpler** and great for small projects.
- **NestJS** is **more structured** and better for large-scale apps.
- Both allow middleware for logging, authentication, and request modification.

### **Final Recommendation**

- If you need **flexibility & simplicity** → **Express.js**.
- If you need **scalability & DI** → **NestJS**.

---

Would you like a deeper dive into **NestJS Guards vs Middleware**? 🚀
