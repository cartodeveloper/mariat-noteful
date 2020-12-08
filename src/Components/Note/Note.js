import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";
import { BASE_URL } from "../../config";
import NotefulContext from "../../NotefulContext/NotefulContext";
import PropTypes from "prop-types";

export default class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };
  static contextType = NotefulContext;

  handleClickDelete = (e) => {
    e.preventDefault();

    const options = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    const note_id = this.props.id;

    fetch(BASE_URL + `/notes/${note_id}`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong deleting the note.");
        }
        return response;
      })
      .then((r) => {
        this.context.deleteNote(note_id);
        this.props.onDeleteNote(note_id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{" "}
            <span className="Date">
              {format(this.props.modified, "Do MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

// using prop types for validation
Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
};
