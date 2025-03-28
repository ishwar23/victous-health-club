document.addEventListener("DOMContentLoaded", function () {
    const adminsList = document.getElementById("admins-list");

    function loadAdmins() {
        fetch("http://localhost:5000/api/admin/admins")
            .then(response => response.json())
            .then(admins => {
                adminsList.innerHTML = "";
                admins.forEach(admin => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${admin.name}</td>
                        <td>${admin.email}</td>
                        <td>${admin.role}</td>
                        <td>
                            <select onchange="updateRole('${admin._id}', this.value)">
                                <option value="Super Admin" ${admin.role === "Super Admin" ? "selected" : ""}>Super Admin</option>
                                <option value="Support Admin" ${admin.role === "Support Admin" ? "selected" : ""}>Support Admin</option>
                                <option value="Review Moderator" ${admin.role === "Review Moderator" ? "selected" : ""}>Review Moderator</option>
                            </select>
                        </td>
                    `;
                    adminsList.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching admins:", error));
    }

    window.updateRole = function (adminId, newRole) {
        fetch(`http://localhost:5000/api/admin/update-role/${adminId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
        })
        .then(response => response.json())
        .then(() => {
            alert("Role Updated Successfully!");
            loadAdmins();
        })
        .catch(error => console.error("Error updating role:", error));
    };

    loadAdmins();
});
