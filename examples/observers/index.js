import MyObserver from './MyObserver.js';

const Observers = [
	{
		channel: '#miqr',
		class: MyObserver,
		bot: true //- habilita lectura de mensajes enviados por un bot. Por defecto es false.
	}
];

export default Observers;