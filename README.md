#### To start, **Docker** is required

How to install and start

- `git clone https://github.com/Gudaites/Sami`
- **Go to repository folder**
- `docker-compose up`
- `yarn` or `npm install`
- `yarn dev` or `npm run dev`

File `Insomnia_2021-07-02.json` can be used to test routes in insomnia or postman!!

Routes

- **get('localhost:3000/beneficiaries')** - Get all beneficiaries
- **get('localhost:3000/beneficiaries/:id')** - Get by id beneficiaries
- **post('localhost:3000/beneficiaries')** - Create a beneficiarie
- **put('localhost:3000/beneficiaries/:id')** - Update a beneficiarie
- **delete('localhost:3000/beneficiaries/:id')** - Delete by id a beneficiarie
