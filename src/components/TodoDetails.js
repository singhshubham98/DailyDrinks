import React, { Component } from "react";

class TodoDetails extends Component {
  state = {
    id: null,
    name: "",
    price: "",
    description: "",
    showModal: false,
  };

  add = () => {
    const userData = JSON.parse(localStorage.getItem(`data`));
    const todos = [...userData];
    const newTodos = todos.map((todo) => {
      if (todo.id === this.state.id) {
        return {
          ...todo,
          name: this.state.name,
          price: this.state.price,
          description: this.state.description,
        };
      }
      return todo;
    });
    const newUser = [...newTodos];
    this.props.updateDrinks(newUser);
    localStorage.setItem(`data`, JSON.stringify(newUser));
    this.setState({
      showModal: false,
    });
    this.props.cancel();
  };

  reset = () => {
    this.setState({ title: "", description: "" });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  edit = (id, name, price, description) => {
    this.setState({
      showModal: !this.state.showModal,
    });
    this.setState({ name, price, description, id });
  };
  render() {
    const isArray = Array.isArray(this.props.detailsToView);
    return (
      <div>
        {isArray &&
          this.props.detailsToView.map((view) => (
            <div key={view.id}>
              <h3 style={{ textDecoration: "underline" }}>{view.name}</h3>
              <p>{view.price}</p>
              <p>{view.description}</p>

              <div className="modal-action-btn-container">
                <button
                  className="modal-action-button"
                  onClick={() =>
                    this.edit(view.id, view.name, view.price, view.description)
                  }
                >
                  Edit
                </button>
                <button
                  className="modal-action-button"
                  onClick={() => this.props.cancel()}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        <div className={`${this.state.showModal ? "modal" : "modal-closed"}`}>
          <div className="modal-container">
            <h3>Edit Drink</h3>

            <input
              type="text"
              placeholder="Name"
              id="name"
              className="input"
              defaultValue={isArray ? this.props.detailsToView[0].name : ""}
              onChange={this.handleChange}
              maxLength="40"
            />
            <input
              type="number"
              placeholder="price"
              id="price"
              className="input"
              defaultValue={isArray ? this.props.detailsToView[0].price : ""}
              onChange={this.handleChange}
              maxLength="40"
            />
            <textarea
              type="text"
              placeholder="description"
              id="description"
              defaultValue={
                isArray ? this.props.detailsToView[0].description : ""
              }
              className="input"
              rows="5"
              onChange={this.handleChange}
              maxLength="250"
            />
            {console.log("price", !this.state.name || !this.state.price)}
            <div className="modal-action-btn-container">
              <button
                className={
                  !this.state.name || !this.state.price
                    ? "modal-action-button disable"
                    : "modal-action-button"
                }
                onClick={() => this.add()}
                disabled={!this.state.name || !this.state.price}
              >
                Save
              </button>

              <button
                className="modal-action-button"
                onClick={() =>
                  this.setState({
                    showModal: false,
                  })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoDetails;
