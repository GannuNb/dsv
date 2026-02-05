import { useState } from "react";
import DynamicForm from "../components/forms/DynamicForm";
import { userFormConfig } from "../config/userFormConfig";
import { createUser } from "../api/userApi";

const Signup = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (data: any) => {
    try {
      setError("");
      await createUser(data);
      setSuccess("User created successfully");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center mb-3">
                Create user
              </h4>

              {success && (
                <div className="alert alert-success">
                  {success}
                </div>
              )}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <DynamicForm
                fields={userFormConfig}
                onSubmit={handleSubmit}
                submitText="Create User"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
