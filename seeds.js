var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{name: "Cloud Rest",
	image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=959&q=80",
	description: "Another NEW crust sensation, handmade just for you. Introducing our new PESTO CRUST PIZZA. Call now and you'll get a large 1-topping Pesto Crust Pizza for just $9.99. It's the newest delicious crust from Domino's; the Pesto Crust Pizza. The distinctive flavor of pesto is created from a zesty blend of sweet basil, parsley and garlic. The pesto is kneaded into our Classic Hand Tossed dough and baked to golden perfection. The hot crust is topped off with herbs and authentic Romano cheese. It's a classic Italian taste that you'll love from the very first bite. For hot and wow call Domino's Pizza Now!"},
		{name: "Vermont",
	image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
	description: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque por conjeturas verosímiles se deja entender que se llamaba Quijana. Pero esto importa poco a nuestro cuento: basta que en la narración dél no se salga un punto de la verdad."},
		{name: "Fire Place",
	image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	description: "To be, or not to be: that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them? To die: to sleep; no more; and, by a sleep to say we end the heart-ache and the thousand natural shocks that flesh is heir to, 'tis a consummation devoutly to be wish'd. To die, to sleep; to sleep: perchance to dream: ay, there's the rub; for in that sleep of death what dreams may come when we have shuffled off this mortal coil, must give us pause. There's the respect that makes calamity of so long a life; for who would bear the whips and scorns of time, the oppressor's wrong, the proud man's contumely, the pangs of dispriz'd love, the law's delay, the insolence of office, and the spurns that patient merit of the unworthy takes, when he himself might his quietus make with a bare bodkin? Who would fardels bear, to grunt and sweat under a weary life, but that the dread of something after death, the undiscover'd country from whose bourn no traveller returns, puzzles the will, and makes us rather bear those ills we have, than fly to others that we know not of? Thus consience doth make cowards of us all; and thus the native hue of resolution is sicklied o'er with the pale cast of thought, and enterprises of great pith and moment with this regard their currents turn awry, and lose the name of action."}
]

function seedDB(){
	//remove all campground
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err)
		}
		else{
			//create some campground
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					}
					else{
						console.log("added a campground");
					}
					//create a comment
					Comment.create({
						text: "This place is great",
						author: "Homer"		   
					},function(err, comment){
						if(err){
							console.log(err);
						}
						else{
							campground.comments.push(comment);
							campground.save();
						}
					})
				})
			})
		}
	 })
	
}

module.exports = seedDB;



