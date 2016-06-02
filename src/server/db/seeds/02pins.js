exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('pins').del(),

    knex('pins').insert(
    {
        pin_title: 'Free golf clubs',
        pin_description: 'Missing the nine iron.',
        pin_image: '../images/uploads/golfclubs.jpg',
        latitude: '39.748790279',
        longitude: '-104.979772568',
        active: true,
        missing: false,
        picked_up: false,
        dropper_id: 1,
        receiver_id: null,
        receiver_message: null,
        receiver_image: null
      }),
    knex('pins').insert(
    {
        pin_title: 'Free bookself',
        pin_description: 'Out back in the alley',
        pin_image: '../images/uploads/bookshelf.jpg',
        latitude: '39.732372967',
        longitude: '-104.979772568',
        active: true,
        missing: false,
        picked_up: false,
        dropper_id: 2,
        receiver_id: null,
        receiver_message: null,
        receiver_image: null
      }),
    knex('pins').insert(
    {
        pin_title: 'Where\'s Waldo?',
        pin_description: 'Can you find him?',
        pin_image: '../images/uploads/waldo.jpg',
        latitude: '39.745408137',
        longitude: '-105.045948029',
        active: true,
        missing: false,
        picked_up: true,
        dropper_id: 5,
        receiver_id: 3,
        receiver_message: 'Found him! What a cutie!',
        receiver_image: '../images/uploads/waldo_found.jpg'
      }),
    knex('pins').insert(
    {
        pin_title: 'Scooby',
        pin_description: 'Scooby Doo, where are you?',
        pin_image: '../images/uploads/scooby.jpg',
        latitude: '39.731762398',
        longitude: '-104.993784428',
        active: true,
        missing: false,
        picked_up: true,
        dropper_id: 5,
        receiver_id: 4,
        receiver_message: 'Thank you! This helps so much!',
        receiver_image: '../images/uploads/scooby_found.jpg'
      }),
    knex('pins').insert(
    {
        pin_title: 'Bunnies!',
        pin_description: 'Scavenger hunt at City park! All bunnies have $$$ inside!',
        pin_image: '../images/uploads/bunnies.jpg',
        latitude: '39.746068080',
        longitude: '-104.953680038',
        active: true,
        missing: false,
        picked_up: true,
        dropper_id: 2,
        receiver_id: 3,
        receiver_message: 'We had so much fun thank you!',
        receiver_image: '../images/uploads/bunnies_found.jpg'
    }),
    knex('pins').insert(
    {
        pin_title: 'Портфель',
        pin_description: 'Это пакет, который вы просили, владимир',
        pin_image: '../images/uploads/briefcase.jpg',
        latitude: '39.723758501',
        longitude: '-105.004706383',
        active: true,
        missing: false,
        picked_up: false,
        dropper_id: 3,
        receiver_id: null,
        receiver_message: null,
        receiver_image: null
    })
  );
};