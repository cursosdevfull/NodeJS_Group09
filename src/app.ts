import express, { Request, Response } from "express";

const app = express();

app.get("/users/details", (req: Request, res: Response) => {
  const user = {
    name: "Sergio Hidalgo",
    age: 30,
  };

  // res.status(200).type("application/json").send(JSON.stringify(user));
  // res.type("application/json").send(JSON.stringify(user));
  res.json(user);
});

app.get("/users", (req: Request, res: Response) => {
  const users = [
    {
      name: "John",
      age: 30,
    },
    {
      name: "Jane",
      age: 25,
    },
    {
      name: "Jack",
      age: 20,
    },
  ];

  res.json(users);
});

const usernameAdmin = "Sergio Hidalgo";

export default app;
export { usernameAdmin };

/* const paths: { [s: string]: any } = {
  "/users/details": (request: any, response: any) => {
    const user = {
      name: "Sergio Hidalgo",
      age: 30,
    };

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(user));
  },
  "/users": (request: any, response: any) => {
    const users = [
      {
        name: "John",
        age: 30,
      },
      {
        name: "Jane",
        age: 25,
      },
      {
        name: "Jack",
        age: 20,
      },
    ];

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  },
};

const app = (request: any, response: any) => {
  const url = request.url;
  const method = request.method;
  console.log(method);
  const path: string = url.toString().toLowerCase() || "";
  if (paths[path]) {
    paths[path](request, response);
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Response from server");
    response.write("That is ok");
    response.end();
  }
}; */
