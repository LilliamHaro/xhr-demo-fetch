window.addEventListener('load', function() {
  // obteniendo elementos del dom
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;

  form.addEventListener('submit', function(event) {
    // preventDefault para el evento submit
    event.preventDefault();
    // vaciando el contenedor de articulos por cada nueva busqueda
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=117c28a425a1454c87487ddf839178f7`;
    fetch(url)
    .then(handleError)
    .then(parseJSON)
    .then(addNews)
    .catch(displayError);
  });

  //funcion para manejar los errores
  function handleError(res) {
    if(!res.ok){
    throw Error(res.status);
  }
  return res;
  }

function parseJSON(res) {
  return res.json().then(function(data) {
    return data.response.docs;
  })
}
  function addNews(data) {
    // recooriendo todos los articulo
    data.forEach(function(article) {
      // obteniendo propiedades
      const snippet = article.snippet;
      const urlArt = article.web_url;
      const headMain = article.headline.main;
      // manipulando el dom para mostrar la informacion ordenadamente
      let div = document.createElement('div');
      let li = document.createElement('li');
      let p = document.createElement('p');
      let a = document.createElement('a');
      let h3 = document.createElement('h3');
      h3.innerHTML = headMain;
      li.appendChild(h3);
      p.innerText = snippet;
      a.innerText = '(Ir al artículo)'
      a.setAttribute('href',urlArt);
      a.setAttribute('target','_blank');
      li.appendChild(h3);
      li.appendChild(p);
      li.appendChild(a);
      div.appendChild(li);
      responseContainer.appendChild(div);
      console.log(article);
    });
  }
  function displayError(err){
  console.log("INSIDE displayErrors!");
  console.log(err);
}
});
