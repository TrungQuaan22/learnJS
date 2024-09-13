

var courseAPI = "http://localhost:3000/courses"
function start() {
    getCourses((courses) => {
        renderCourses(courses);
    })
    handleCreateForm();
}

start()
function getCourses(callback) {
    fetch(courseAPI)
        .then(respone => respone.json())
        .then(callback)
}

function createCourse(data, callback) {

    //get maxId
    getCourses((courses) => {
        const maxId = Math.max(...courses.map(course => Number(course.id) || 0));
        data.id = maxId + 1;
    });
    fetch(courseAPI, {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then((respone) => respone.json())
        .then(callback)
        
}
function deleteCourse(id) { 
    fetch(courseAPI + '/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function() {
        getCourses(renderCourses);
    })
}

function renderCourses(courses) {
    var listCoursesBlog = document.querySelector("#list-courses")
    var htmls = courses.map((course) => {
        return `
            <li>
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="deleteCourse(${course.id})">Xóa</button>
            </li>
        `
    })
    listCoursesBlog.innerHTML = htmls.join("");
}
function handleCreateForm() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name = "description"]').value;
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData, function() {
            getCourses(renderCourses);
        })

    }

}