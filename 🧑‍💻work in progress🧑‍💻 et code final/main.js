const data = [
  {
    id: 1,
    productName: "Black T",
    price: 31,
    imageSource:
      "https://img.ltwebstatic.com/images3_pi/2021/12/10/16391012757378a5e668f4378f9907939fab3eb501_thumbnail_900x.webp",
    dateCreation: "1663220668000",
    quantityAvailable: 22,
  },
  {
    id: 2,
    productName: "White Tshirt",
    price: 42,
    imageSource: "http://dummyimage.com/156x100.png/ff4444/ffffff",
    dateCreation: "1670633318000",
    quantityAvailable: 10,
  },
  {
    id: 3,
    productName: "Super Shirt",
    price: 26,
    imageSource:
      "https://wordans-a1a5.kxcdn.com/files/model_specifications/2019/5/15/999738/999738_big.jpg?1557915807",
    dateCreation: "1644526572000",
    quantityAvailable: 0,
  },
  {
    id: 4,
    productName: "TShirt du jour",
    price: 24,
    imageSource: "http://dummyimage.com/132x100.png/cc0000/ffffff",
    dateCreation: "1656618686000",
    quantityAvailable: 27,
  },
  {
    id: 5,
    productName: "Celui du lendemain",
    price: 35,
    imageSource: "http://dummyimage.com/190x100.png/cc0000/ffffff",
    dateCreation: "1652280551000",
    quantityAvailable: 10,
  },
  {
    id: 6,
    productName: "TSuper",
    price: 27,
    imageSource: "http://dummyimage.com/150x100.png/5fa2dd/ffffff",
    dateCreation: "1645181728000",
    quantityAvailable: 28,
  },
  {
    id: 7,
    productName: "Shirtou",
    price: 18,
    imageSource: "http://dummyimage.com/183x100.png/5fa2dd/ffffff",
    dateCreation: "1654899630000",
    quantityAvailable: 17,
  },
  {
    id: 8,
    productName: "Goldia",
    price: 37,
    imageSource: "http://dummyimage.com/129x100.png/ff4444/ffffff",
    dateCreation: "1655872683000",
    quantityAvailable: 11,
  },
  {
    id: 9,
    productName: "Tshirt bizarre",
    price: 35,
    imageSource: "http://dummyimage.com/203x100.png/cc0000/ffffff",
    dateCreation: "1651944916000",
    quantityAvailable: 22,
  },
  {
    id: 10,
    productName: "Malinda",
    price: 19,
    imageSource: "http://dummyimage.com/148x100.png/dddddd/000000",
    dateCreation: "1653454557000",
    quantityAvailable: 8,
  },
];

const calculatePriceVatIncluded = (price)=> {
  return price + (price * 20/100);
}

const buildProductItem = (productItem) => {
  const htmlContent = `
        <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img src="${productItem.imageSource}" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${productItem.productName}
              </a>
            </h3>
            <p class="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <p class="text-sm font-medium text-gray-900">$${productItem.price}</p>
          <p class="text-sm font-medium text-gray-900">Vat inclus: $${calculatePriceVatIncluded(productItem.price)}</p>
        </div>`;

  const productHtmlElement = document.createElement("div");
  productHtmlElement.classList.add("group");
  productHtmlElement.classList.add("relative");
  productHtmlElement.innerHTML = htmlContent;
  return productHtmlElement;
};

const cleanProductContainer = () => {
  const productsContainerElement = document.getElementById("productsContainer");
  productsContainerElement.innerHTML = "";
};

const fetchData = (filter) => {
  cleanProductContainer();

  let textFilter;

  if (filter) {
    textFilter = filter.textFilter;
  }

  console.log("fetching data");
  const productsContainerElement = document.getElementById("productsContainer");

  console.log("textFilter:", { textFilter });
  const filteredData = data.filter((productItem) => {
    if (!textFilter) {
      return true;
    }

    const doesInclude = productItem.productName.includes(textFilter);
    console.log('does it include ?:', { doesInclude, productName: productItem.productName, textFilter })
    if (doesInclude) {
      return true;
    }

    return false;
  });

  console.log("filtered ", filteredData);
  filteredData.forEach((productItem) => {
    const productElement = buildProductItem(productItem);
    productsContainerElement.appendChild(productElement);
  });
};

const setupSearchForm = () => {
  const searchFormElement = document.getElementById("searchForm");
  searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent refresh
    console.log("clicked on search button");

    const defaultSearchElement = document.getElementById("default-search");
    const textSearchValue = defaultSearchElement.value;

    const filter = { textFilter: textSearchValue };
    fetchData(filter);
  });
};

const init = () => {
  fetchData();
  setupSearchForm();
};

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  init();
});
