import React from "react";

export default ({ drinks, deleteTodo, viewToDo }) => {
  const isEmptyArr = drinks.length > 0 ? false : true;
  return (
    <div className="todo-list-container">
      <ul>
        {!isEmptyArr &&
          drinks.map((todo, index) => (
            <li className="" key={index}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    className={`'font20 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.name}
                  </p>
                  <p
                    className={`font14 ${todo.completed ? "line-through" : ""}`}
                    style={{ paddingLeft: "15px" }}
                  >
                    {todo.price}
                  </p>
                </div>
                <p className={`font12 ${todo.completed ? "line-through" : ""}`}>
                  {todo.description}
                </p>
              </div>

              <div>
                <button
                  className="remove-todo"
                  onClick={() => viewToDo(todo.id)}
                >
                  Edit
                </button>
                <button
                  className="remove-todo"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        {isEmptyArr && <li className="noData">No Drinks Available, Add One</li>}
      </ul>
    </div>
  );
};
