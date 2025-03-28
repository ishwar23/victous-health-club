document.addEventListener("DOMContentLoaded", function () {
    const usersList = document.getElementById("users-list");

    function loadUsers() {
        fetch("http://localhost:5000/api/admin/users")
            .then(response => response.json())
            .then(users => {
                usersList.innerHTML = "";
                users.forEach(user => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
                    `;
                    usersList.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    window.deleteUser = function (userId) {
        if (confirm("Are you sure you want to delete this user?")) {
            fetch(`http://localhost:5000/api/admin/users/${userId}`, { method: "DELETE" })
                .then(response => response.json())
                .then(() => {
                    alert("User deleted successfully!");
                    loadUsers();
                })
                .catch(error => console.error("Error deleting user:", error));
        }
    };

    loadUsers();
});
