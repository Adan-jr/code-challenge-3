fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(film => {
    document.querySelector('#poster').src = film.poster;
    document.querySelector('#title').textContent = film.title;
    document.querySelector('#runtime').textContent = `${film.runtime} minutes`;
    document.querySelector('#showtime').textContent = film.showtime;
    document.querySelector('#tickets-available').textContent = film.capacity - film.tickets_sold;
  });

  fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(films => {
    const filmsList = document.querySelector('#films');
    filmsList.innerHTML = ''; 
    films.forEach(film => {
      const li = document.createElement('li');
      li.textContent = film.title;
      li.classList.add('film', 'item');
      filmsList.appendChild(li);
    });
  });

  const buyTicketBtn = document.querySelector('#buy-ticket-btn');
buyTicketBtn.addEventListener('click', () => {
  const availableTickets = parseInt(document.querySelector('#tickets-available').textContent);
  if (availableTickets > 0) {
    const newTicketsSold = film.tickets_sold + 1;
    fetch(`http://localhost:3000/films/${film.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tickets_sold: newTicketsSold }),
    })
    .then(response => response.json())
    .then(updatedFilm => {
      document.querySelector('#tickets-available').textContent = updatedFilm.capacity - updatedFilm.tickets_sold;
    });
  } else {
    buyTicketBtn.textContent = 'Sold Out';
  }
});

fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(films => {
    const filmsList = document.querySelector('#films');
    films.forEach(film => {
      const li = document.createElement('li');
      li.textContent = film.title;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      li.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/films/${film.id}`, {
          method: 'DELETE',
        })
        .then(() => {
          li.remove();
        });
      });
      filmsList.appendChild(li);
    });
  });

  if (availableTickets === 0) {
    li.classList.add('sold-out');
    buyTicketBtn.textContent = 'Sold Out';
  }
  
