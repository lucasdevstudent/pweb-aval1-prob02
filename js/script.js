const API_URL = "https://openlibrary.org/search.json";
const FIELDS = "key,title,author_name,first_publish_year,cover_i,publisher,isbn,edition_count";
const MAX_RESULTS = 20;
const MAX_LIST_ITEMS = 5;

const form = document.getElementById("search-form");
const searchType = document.getElementById("search-type");
const searchText = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");
const message = document.getElementById("message");
const resultsList = document.getElementById("results");
const detailsDialog = document.getElementById("details");
const detailsTitle = document.getElementById("details-title");
const detailsContent = document.getElementById("details-content");
const closeButton = document.getElementById("close-button");

let books = [];

form.addEventListener("submit", handleSearch);
closeButton.addEventListener("click", () => detailsDialog.close());

async function handleSearch(event) {
  event.preventDefault();

  const text = searchText.value.trim();
  if (text === "") {
    showMessage("Digite um termo para pesquisar.", true);
    searchText.focus();
    return;
  }

  // limpa resultados anteriores
  resultsList.innerHTML = "";
  books = [];
  showMessage("Carregando...");
  searchButton.disabled = true;

  try {
    const url = `${API_URL}?${searchType.value}=${encodeURIComponent(text)}&fields=${FIELDS}&limit=${MAX_RESULTS}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro HTTP " + response.status);
    }

    const data = await response.json();
    books = data.docs;

    if (books.length === 0) {
      showMessage("Nenhum livro encontrado.");
    } else {
      showMessage(`${books.length} livro(s) exibido(s).`);
      showResults();
    }
  } catch (error) {
    showMessage("Não foi possível realizar a pesquisa. Verifique sua conexão e tente novamente.", true);
  } finally {
    searchButton.disabled = false;
  }
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? "error" : "";
}

// Transforma lista em texto legível; retorna "Não informado" se vazia
function formatList(list, max = MAX_LIST_ITEMS) {
  if (!list || list.length === 0) {
    return "Não informado";
  }
  const shown = list.slice(0, max).join(", ");
  return list.length > max ? `${shown} e mais ${list.length - max}` : shown;
}

function createCover(book) {
  if (book.cover_i) {
    const img = document.createElement("img");
    img.className = "cover";
    img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    img.alt = `Capa do livro ${book.title}`;
    img.loading = "lazy";
    return img;
  }
  const placeholder = document.createElement("div");
  placeholder.className = "no-cover";
  placeholder.textContent = "Sem capa";
  return placeholder;
}

function createParagraph(label, value) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = label + ": ";
  p.append(strong, value);
  return p;
}

function showResults() {
  books.forEach((book, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "info";

    const title = document.createElement("h2");
    title.textContent = book.title || "Título não informado";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.textContent = "Ver detalhes";
    detailsButton.setAttribute("aria-label", `Ver detalhes de ${book.title || "livro sem título"}`);
    detailsButton.addEventListener("click", () => showDetails(index));

    info.append(
      title,
      createParagraph("Autor(es)", formatList(book.author_name)),
      createParagraph("Primeira publicação", book.first_publish_year || "Não informado"),
      detailsButton
    );

    li.append(createCover(book), info);
    resultsList.append(li);
  });
}

function showDetails(index) {
  const book = books[index];

  detailsTitle.textContent = book.title || "Título não informado";
  detailsContent.innerHTML = "";

  const text = document.createElement("div");
  text.append(
    createParagraph("Autor(es)", formatList(book.author_name)),
    createParagraph("Primeira publicação", book.first_publish_year || "Não informado"),
    createParagraph("Editora(s)", formatList(book.publisher)),
    createParagraph("ISBN", formatList(book.isbn)),
    createParagraph("Quantidade de edições", book.edition_count ?? "Não informado")
  );

  detailsContent.append(createCover(book), text);
  detailsDialog.showModal();
}
