import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState, /*useEffect*/ } from 'react';
import { Link } from "react-router-dom";
import { ALL_USERS_QUERY } from './queries';

/* Home component */

const DELETE_USERS_MUTATION = gql`
      mutation DeleteUsers($emails: [ID]!) {
        deleteUsers(emails: $emails)
      }
 `;

/*const RESET_USERS_MUTATION = gql`
      mutation ResetUsers {
        resetUsers
      }
 `;*/

 /* Home function passing users as a prop */

function Home({ users }) {
  const [emails, setEmails] = useState([]);
  //const [resetUsers] = useMutation(RESET_USERS_MUTATION);


  const [deleteUsers] = useMutation(DELETE_USERS_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
  });

  /*useEffect(() => {

    resetUsers()

  }, [])*/

/* SelectUser function using an if else statement */

  function selectUser(evt, email) {
    if (evt.target.checked) {
      setEmails([...emails, email])
    } else {
      setEmails(emails.filter(e => e !== email))
    }
  }




  return (
    <div className="App">
      <main>
        <header className="App-header">
          <h1>Users</h1>
          <button className="firstButton"
            type="submit"
            onClick={() => deleteUsers({ variables: { emails } })}
            disabled={!emails.length}
          >
            Delete
          </button>
        </header>
        {/* Represents Table */}
        <section>
          <div className="row">
            <h4>EMAIL</h4>
            <h4>NAME</h4>
            <h4>ROLE</h4>
          </div>
          {users.map((user) => (
            <div className="row data">

              <p className="link">

                

                <input type="checkbox"
                  onClick={evt => evt.stopPropagation()}
                  onChange={evt => selectUser(evt, user.email)}
                />
                <Link className="link"
                  style={{ textDecoration: "none" }}
                  to={`/Edit/${user.email}`}
                  key={user.email}
                > {user.email}
                </Link>
              </p>

              <p>{user.name}</p>
              <p>{user.role}</p>
            </div>

          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;