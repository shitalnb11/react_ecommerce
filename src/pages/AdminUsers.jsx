export default function AdminUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div>
      <h3 className="mb-4">All Users</h3>

      {users.length === 0 && <p>No users found</p>}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className="badge bg-primary">
                  {u.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
