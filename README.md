# Burger & Burgers

## Project Setup

This project was bootstrapped with vite-template-redux. Tailwind and React Router were added separately. There are also two primitive components used from Radix UI: DropdownMenu and Dialog. And a few icons from Lucide.

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Running the Project Locally

Prerequisites: Node.js (v18+) and npm installed.

```sh
npm install
npm run dev
```

## Functionality

- Products are fetched from an endpoint returning a JSON file and displayed on the home page.
- Products can be added to the cart from ProductDetails page - URL of each product is unique and can be shared.
- Product list also displays which products are currently in the cart and their total quantity.
- The cart displays the added products, their quantity, and the total price - with a dropdown menu to perform actions on each item.
- The cart has a "Pay Now" button that opens a payment dialog that, unfortunately, doesn't send me any money.
