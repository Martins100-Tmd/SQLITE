const FORM = document.getElementById("form");
const BTN = document.getElementById("btn");
const USER_CONTAINER = document.getElementById("user");
const Fetch = (url, method, body) => {
  let action;
  if (method === "POST") {
    action = fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } else if (method === "GET") {
    action = fetch(url, {
      method: method,
    });
  } else if (method === "PUT" || method === "DELETE") {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } else {
    action = new Error("Error");
  }
  return action;
};
const Update = (e) => {
  let [props, value] = [
    e.target.innerHTML.split(": ")[0],
    e.target.innerHTML.split(": ")[1],
  ];
  let id = e.target.parentElement.children[0].dataset.id;
  if (parseInt(id)) {
    Fetch("http://localhost:8080/api/update", "PUT", {
      id,
      data: [props, value],
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
};
BTN.onclick = (e) => {
  e.preventDefault();
  let form = new FormData(FORM);

  form = Object.fromEntries([...form.entries()]);
  console.log(form);
  Fetch("http://localhost:8080/api/post", "POST", form)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

Fetch("http://localhost:8080/api/post", "GET")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let all = data.data;
    for (let i = 0; i < all.length; i++) {
      console.log(all[i]);
      const div = document.createElement("div");
      div.className =
        "flex flex-col items-start rounded p-3 shadow gap-3 bg-gradient-to-r from-cyan-200 to-blue-200 w-full";
      div.innerHTML = `
      <span class="text-red-400 text-2xl self-start p-2 fa" data-id=${all[i].id}>&#xf1f8;</span>
        <div class="rounded-sm outline-none w-full mx-auto shadow text-black font-pop text-sm p-5"
         contenteditable="true" spellcheck="true" onblur=Update(event)>Name: ${all[i].name}</div>
        <div class="rounded-sm outline-none w-full mx-auto shadow text-black font-pop text-sm p-5"
         contenteditable="true" spellcheck="true" onblur=Update(event)>Email: ${all[i].email}</div>
        <div class="rounded-sm outline-none w-full mx-auto shadow text-black font-pop text-sm p-5"
         contenteditable="true" spellcheck="true" onblur=Update(event)>Password: ${all[i].password}</div>
        `;
      div.onclick = (e) => {
        let ID = e.target.dataset.id;
        if (parseInt(ID)) {
          fetch("http://localhost:8080/api/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: ID }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }
      };
      USER_CONTAINER.appendChild(div);
    }
  })
  .catch((err) => console.log(err));
