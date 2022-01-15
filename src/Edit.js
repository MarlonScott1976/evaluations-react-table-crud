import { useMutation } from '@apollo/react-hooks';
import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ALL_USERS_QUERY } from './queries';
import { useParams, useNavigate } from "react-router-dom";
import './App.css';

/* Edit component */

const UPDATE_USER_MUTATION = gql`
 mutation UpdateUser($email: ID!, $newAttributes: UserAttributesInput!){
  updateUser(email: $email, newAttributes: $newAttributes){
    role
    email 
  }
 }
  `


const GET_USER_QUERY = gql`
  query GetUser($email: ID!) {
    user(email: $email) {
      email
      name
      role
    }
  }
`;


/* Edit function passing users as a prop */



function Edit({ users }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery(GET_USER_QUERY, { variables: { email: id } });
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
  });



  useEffect(() => {
    if (data) {
      setUserName(data.user.name)
      setUserRole(data.user.role)
    }
  }, [data])



  return (
    <div className="App">
      <main>

        <header className="Edit-header">
          <h1>{id}</h1>
          <button className="Secondbutton"
            onClick={() => {
              updateUser({
                variables:
                {
                  email: id,
                  newAttributes:
                  {
                    role: userRole,
                    name: userName
                  }
                }
              })
              navigate("/")
            }}
          >
            Save
          </button>
        </header>

        <section>

          {/*Left Side*/}
          <div>
            <h3>Name</h3>
            <input
              className="Input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/*Right Side*/}

          <div className="Flex">
            <div style={{ borderLeft: "1px solid" }}
              className="Vertical-Line"
            >
              <div>
                <h3 className="role">Role</h3>
              </div>

              {/*Radio Buttons */}

              <div className="Radio">
                <div>
                  <input type="radio"
                    style={{ width: "auto" }}
                    checked={userRole === 'ADMIN'}
                    key={users.role}
                    value="ADMIN"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>Admin</span>
                </div>

                <div>
                  <input type="radio"
                    style={{ width: "auto" }}
                    checked={userRole === 'DEVELOPER'}
                    key={users.role}
                    value="DEVELOPER"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>Developer</span>
                </div>

                <div>
                  <input type="radio"
                    style={{ width: "auto" }}
                    checked={userRole === 'APP_MANAGER'}
                    key={users.role}
                    value="APP_MANAGER"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>App Manager</span>
                </div>

                <div>
                  <input type="radio"
                    style={{ width: "auto" }}
                    checked={userRole === 'MARKETING'}
                    key={users.role}
                    value="MARKETING"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>Marketing</span>
                </div>

                <div>
                  <input type="radio"
                    style={{ width: "auto" }}
                    checked={userRole === 'SALES'}
                    key={users.role}
                    value="SALES"
                    onChange={(e) => setUserRole(e.target.value)}
                  />{" "}
                  <span>Sales</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Edit;