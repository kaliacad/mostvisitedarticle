
# Most visited articles (Wikimedia)

Most visted articles is a web application which was developed as part of an intensive workshop with Wikimedia RDC. Its main objective is to filter the available data on Wikimedia and identify the most searched articles in a given country.

# Table of Contents
  - [Main Features](#main-features)
  - [Usage](#usage)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
  - [Technologies Used](#technologies-used)
  - [Start Development Mode](#start-development-mode)
  - [Usage](#usage-1)
  - [Contribution](#contribution)
  - [License](#license)



## Main Features

- **Data Filtering**: The application uses the Wikimedia API to extract and organize relevant data based on the specified country.
- **Identification of Most Searched Articles**: Algorithms are implemented to analyze the filtered data and determine the most viewed articles in the selected country.
- **Intuitive User Interface**: A user-friendly interface allows users to easily view the results of the analysis and navigate through the web pages.

##  Usage

### Prerequisites

- [Node.js](https://nodejs.org/en), npm, and pnpm must be installed on your machine.

### Installation Steps

1. Clone this repository to your local machine.
```
git clone https://github.com/BirushaNdegeya/mostvisitedarticle.git
```
3. Navigate to the application's directory in your terminal.
4. Install pnpm in order to install all necessary dependencies ("npm install no longer is compatible)
```
npm i -g pnpm
```
5. Install all necessary dependecies
```
pnpm install
```
## Technologies Used

- **React.js**: JavaScript framework used for developing the user interface.
- **JavaScript**: Programming language used for developing the application.
- **TypeScript**: Superset of JavaScript that adds static types, used for writing more robust code.
- **Node.js**: JavaScript platform used to run server-side scripts.
- **pnpm and npm**: Node.js package managers used for installing project dependencies

## Start Development Mode

1. Use the following command to run the project locally
```
pnpm dev
```
2. Open your web browser and go to the URL [http://localhost:3000](http://localhost:3000).

## Usage

1. On the homepage, select the country for which you want to analyze the data.
2. Click the "Analyze" button to start the analysis process.
3. Once the analysis is complete, the results will be displayed on the page, indicating the most searched articles in the selected country.

## Contribution

Contributions are welcome! If you wish to contribute to the improvement of this application, please follow these steps:

1. Fork this repository.
2. Create a new branch for your changes
```
git checkout -b feature-improvement
``` 
3. Make your changes and commit them
```
git commit -am 'Add a new feature'
``` 
4. Push your changes to your branch 
```
git push origin feature-improvement
``` 
5. Create a new Pull Request and describe your changes.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

