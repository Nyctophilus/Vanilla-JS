fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => DestructureData(users));

function DestructureData(object) {
  object.forEach((user) => {
    createDatafield(
      user.name,
      user.email,
      user.address.city,
      user.address.geo.lat
    );
  });
}

function createDatafield(name, email, city, number) {
  const div = document.createElement("div");
  div.style.cssText = `display: flex; gap: 1.5rem;width: 50%;border-bottom: 2px solid grey`;

  const span1 = document.createElement("span"),
    span2 = document.createElement("span"),
    span3 = document.createElement("span"),
    span4 = document.createElement("span");

  (span1.textContent = name),
    (span1.style = `color:#ffc107`),
    (span2.textContent = email),
    (span2.style = `color:#00bcd4`),
    (span3.textContent = city),
    (span3.style = `color:#17d400`),
    (span4.textContent = number),
    (span4.style = `color:#e56ca9`);

  div.append(span1, span2, span3, span4);
  document.body.appendChild(div);
}
