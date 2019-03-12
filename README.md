# Readme.md
How to run the project:
* Run the `run-example.sh` file. It will install all of the dependencies required for the server & client, run the unit test suite, and launch them both and open your default browser on `localhost:4200`. It will ask for your API key - since I can't reasonably predict how you store API keys, I figured this might be the easiest way for you to provide the key to test the code 
* Alternatively, run `npm install` in both the *server*, and *client* directories and then run the command `npm run start` in the *client* directory. The API key will be taken from the environment variable named `APIKEY`.

---
### Project Notes
Use the above guidance to help you run the project. You will need to have node and NPM installed on your computer.

To use the interface, add some coordinates into the search box in the format `50.4164582, -5.100202` or `50.4164582 / -5.100202`. You may choose whether or not to include spaces. Click search once you have entered your coordinates.

You can also utilise your current location by clicking on the location icon to the left of the search bar. After a short pause it will enter your approximate location into the search box, after which you can search for lodges near you.

### Technical Questions
1. How long did you spend completing the assignment? How (if at all) would you change your solution if you had more time?

	I spent about 6 hours on the solution. This included the time spent setting up a GoogleAPI account and trying to find a way to deal with Cross Origin Resource Policy restrictions and writing the Express server to get around it.

	I looked for a nicer way than including the client library Google provides but [there doesn't appear to be one that will play nicely with Angular](https://github.com/angular/angular-cli/issues/6389). The cleanest alternative I could find was adding some middleware to handle the query for me. It also meant I didn't have to worry about securing the Google API key on client.

	#### What I would change
	I'm not particularly happy with the UI. Although functional it could be much more user friendly (it's not obvious you can use the location icon at the left of the input box to automatically fill in your coordinates). Also, as someone who likes his UI to actually look pretty, I would have liked to spend some time making it generally look nicer. The background is just there to give it some kind of theme but I was more concerned with getting a working prototype working with the limited amount of time I could actually spend on this.

	There are also some gaps with the error handling. Again, with more time these could be resolved. For example; there is no error 400/500 handling for the API request, so if an error does occur, it does so silently with no user feedback (apart from auto-generated error messages in the console). With more time I would refactor how I have written those event chains to add some way of giving the user feedback when something goes wrong.

	Additionally, although not too important, is the use of default JavaScript alerts. These aren't pretty and given more time I would have integrated them into the UI to make the experience less jarring and more integrated to keep user focus on the search bar.

2. Can you describe a feature (perhaps with some reference code) that exists in your chosen programming language that you found particularly useful?

	I find using the observable pattern very useful for easily separating the concerns of service and components which utilise those services.
	
	For example, in `SearchHandlerService`:
	```
	public itemsUpdated: EventEmitter<Lodge[]> = new EventEmitter(true);

	public listItems(data: {[k: string]: any}) {
		// --- code to create an array of lodges --- //
		this.itemsUpdated.emit(this.lodges);
	}
	```

	`DropdownListComponent` has a subscription to `itemsUpdated`. When the search-handler service receives new search data, it processes it and then emits this event with the data contained. The subscribers can then receive this data and process it without SearchHandlerService calling a function on each subscribing component.

	There is some debate about whether using Angulars' EventEmitter in services is best practice, however in this limited case and project there was no harm in utilising it.

3. How would you track down a performance issue with yours or another developer's code?

	The most obvious way is by logging how long requests and processes take in every level of the stack. Ideally every project would have an optional deep logging level to opt into which give great detail on what exactly is happening and when in the code. This unfortunately isn't the case for the majority of systems so manually adding logging statements to high volume request/processing areas of the system would be a good place to start.

	Alternatively, if this question refers to general code performance issues like choosing to use a JavaScript `.map` function instead of a `for` loop, then this would usually be a personal preference of the developer. Normally this wouldn't be an issue but with extremely large iterable objects/arrays, switching to a `for` loop could have a small improvement in processing time.

	I guess this question could also refer to inefficient/short sighted algorithmic choices by the developer. Even though it's not my area of expertise, an example could be a system that has small data sets that require sorting via a sorting algorithm but the system has the potential for those data sets to become much larger. In this case, to future proof the system, execution time for larger datasets could be improved by replacing an Insertion sort (which is faster on smaller datasets) with a Quicksort (which is faster - and a better efficiency tradeoff - with larger datasets).