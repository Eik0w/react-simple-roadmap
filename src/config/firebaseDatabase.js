/** Firebase configuration **/
export const config = {
	apiKey: 'AIzaSyD--xsmylqBu1tzS3jr640QPnVWakOYtyI',
	authDomain: 'perso-47ffa.firebaseapp.com',
	databaseURL: 'https://perso-47ffa.firebaseio.com',
};

export const keyDataBase = [
	'released_this_week_prod',
	'released_last_week_prod',
	'toBe_released_next_two_weeks_prod',
	'toBe_released_next_two_weeks_test',
	'released_last_week_test',
	'toBe_released_next_week_test',
	'studies',
];

export const keyDataBaseDisplay = {
	released_last_week_prod: 'RELEASED IN PRODUCTION LAST WEEK',
	released_this_week_prod: 'RELEASED IN PRODUCTION THIS WEEK',
	released_last_week_test: 'RELEASED ON TEST ENVIRONMENT LAST WEEK',
	toBe_released_next_two_weeks_prod:
		'TO BE RELEASED IN PRODUCTION WITHIN THE NEXT 2 WEEKS',
	toBe_released_next_week_test: 'TO BE RELEASED ON TEST ENVIRONMENT NEXT WEEK',
	toBe_released_next_two_weeks_test:
		'TO BE RELEASED ON TEST ENVIRONMENT THIS WEEK',
	studies: 'ONGOING DEVELOPPEMENTS & STUDIES',
};
