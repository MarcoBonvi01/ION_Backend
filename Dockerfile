# Usa Node Alpine (leggero)
FROM node:lts-alpine

# Cartella di lavoro
WORKDIR /app

# Copio solo i file necessari per installare le dipendenze
COPY package*.json ./

# Installa tutte le dipendenze (dev + prod) per poter buildare NestJS
RUN npm install

# Copio il resto del codice
COPY . .

# Compilo il progetto NestJS
RUN npm run build

# Dopo la build elimino le dipendenze dev per alleggerire l'immagine
RUN npm prune --production

EXPOSE 3000

# Avvio il server NestJS
CMD ["node", "dist/main.js"]
