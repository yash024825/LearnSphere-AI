// seedData.js — 10 courses x 3 modules, each module has a real YouTube embed URL
// matched exactly to that module's topic.

module.exports = [
  {
    title: "Intro to React",
    description: "A short course covering React fundamentals.",
    category: "Web Development",
    modules: [
      {
        title: "Module 1: Components",
        videoUrl: "https://www.youtube.com/embed/Y6aYx_KKM7A",
        lectureContent: "Components are the building blocks of a React app. A component is a reusable piece of UI defined as a function that returns markup describing what should appear on the screen. Components can be composed together to build complex interfaces from small, testable pieces.",
        questions: [
          { question: "What is a React component most fundamentally?", options: ["A function that returns a database query","A reusable piece of UI that returns markup","A CSS stylesheet","A server-side route handler"], correctAnswerIndex: 1 },
          { question: "How are complex UIs typically built in React?", options: ["By writing one giant HTML file","By composing smaller components together","By avoiding functions entirely","By using only inline styles"], correctAnswerIndex: 1 },
          { question: "A React component can be defined as:", options: ["Only a class","Only a function","A function or a class","A JSON object only"], correctAnswerIndex: 2 },
        ],
      },
      {
        title: "Module 2: Props and State",
        videoUrl: "https://www.youtube.com/embed/IYvD9oBCuJI",
        lectureContent: "Props pass data from a parent component into a child component and are read-only from the child's perspective. State holds data that belongs to a component and can change over time, triggering a re-render whenever it's updated.",
        questions: [
          { question: "Props in React are best described as:", options: ["Mutable data owned by the child","Read-only data passed from parent to child","A way to style components","A type of database"], correctAnswerIndex: 1 },
          { question: "What happens when a component's state changes?", options: ["Nothing happens automatically","The component re-renders","The whole page reloads","The props are deleted"], correctAnswerIndex: 1 },
          { question: "Which statement is true about props?", options: ["A child component can freely modify its own props","Props flow from parent to child","Props flow from child to parent","Props are stored in localStorage"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: Hooks",
        videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q",
        lectureContent: "Hooks let function components use state and other React features without writing a class. useState manages local state, while useEffect lets you run side effects like data fetching in response to renders.",
        questions: [
          { question: "What does useState do?", options: ["Fetches data from an API","Manages local state in a function component","Defines CSS styles","Routes between pages"], correctAnswerIndex: 1 },
          { question: "useEffect is commonly used for:", options: ["Defining component props","Running side effects like data fetching","Compiling JSX","Styling components"], correctAnswerIndex: 1 },
          { question: "Hooks allow function components to:", options: ["Use state without writing a class","Replace HTML entirely","Avoid using JavaScript","Run only on the server"], correctAnswerIndex: 0 },
        ],
      },
    ],
    finalExam: [
      { question: "What does JSX compile down to?", options: ["React.render calls","React.createElement calls","HTML strings","CSS rules"], correctAnswerIndex: 1 },
      { question: "Which hook manages state in a function component?", options: ["useEffect","useState","useRef","useContext"], correctAnswerIndex: 1 },
      { question: "What is the purpose of a key prop in a list?", options: ["Styling","Helping React identify which items changed","Encrypting data","Sorting the array"], correctAnswerIndex: 1 },
      { question: "What triggers a component re-render?", options: ["Changing state or props","Refreshing the OS","Restarting the server","Editing CSS only"], correctAnswerIndex: 0 },
      { question: "What does \"props\" refer to conceptually?", options: ["Properties passed into a component","Protocol options","Programmatic state","Page routes"], correctAnswerIndex: 0 },
      { question: "Where should side effects like API calls typically go?", options: ["Directly in JSX","Inside useEffect","In the render return statement","In CSS"], correctAnswerIndex: 1 },
      { question: "What is a controlled component?", options: ["A component with no props","A form element whose value is controlled by React state","A component rendered server-side only","A deprecated React feature"], correctAnswerIndex: 1 },
      { question: "What does the virtual DOM help React do?", options: ["Skip JavaScript entirely","Efficiently update the real DOM","Style components","Store user data"], correctAnswerIndex: 1 },
      { question: "Which is true about unidirectional data flow in React?", options: ["Data flows both ways freely","Data flows from parent to child","Data flows from child to parent only","There is no data flow"], correctAnswerIndex: 1 },
      { question: "What does calling useState with an initial value set up?", options: ["It runs only after the first render","It sets the initial state on first render","It deletes existing state","It throws an error"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "JavaScript Fundamentals",
    description: "Core JavaScript concepts every web developer needs.",
    category: "Web Development",
    modules: [
      {
        title: "Module 1: Variables & Data Types",
        videoUrl: "https://www.youtube.com/embed/edlFjlzxkSI",
        lectureContent: "JavaScript has three ways to declare variables — var, let, and const — with let and const scoped to the block they're declared in. Core data types include strings, numbers, booleans, objects, arrays, null, and undefined.",
        questions: [
          { question: "Which keyword declares a block-scoped variable that can be reassigned?", options: ["const","let","var","function"], correctAnswerIndex: 1 },
          { question: "Which of these is NOT a primitive type in JavaScript?", options: ["string","number","array","boolean"], correctAnswerIndex: 2 },
          { question: "What does const prevent?", options: ["Reassigning the variable","Mutating an object's properties","Declaring the variable","Reading the variable"], correctAnswerIndex: 0 },
        ],
      },
      {
        title: "Module 2: Functions & Scope",
        videoUrl: "https://www.youtube.com/embed/gigtS_5KKww",
        lectureContent: "Functions are first-class values in JavaScript and can be passed around like any other variable. Arrow functions provide a shorter syntax and do not bind their own `this`, inheriting it from the enclosing scope instead.",
        questions: [
          { question: "What does it mean for functions to be first-class in JS?", options: ["They can only run once","They can be assigned to variables and passed as arguments","They must be declared with class","They cannot return values"], correctAnswerIndex: 1 },
          { question: "Arrow functions differ from regular functions mainly because:", options: ["They run faster always","They don't bind their own this","They can't take arguments","They are only for math"], correctAnswerIndex: 1 },
          { question: "What is a closure in JavaScript?", options: ["A syntax error","A function's ability to remember variables from its enclosing scope","A way to close a browser tab","A type of loop"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: Arrays & Objects",
        videoUrl: "https://www.youtube.com/embed/R8rmfD9Y5-c",
        lectureContent: "Arrays store ordered collections of values and come with methods like map, filter, and reduce for transforming data. Objects store key-value pairs and are the basis for most data modeling in JavaScript.",
        questions: [
          { question: "Which array method returns a new array without modifying the original?", options: ["push","map","splice","sort (in place)"], correctAnswerIndex: 1 },
          { question: "What does Array.prototype.filter return?", options: ["A single value","A new array containing only matching elements","The original array","undefined"], correctAnswerIndex: 1 },
          { question: "Objects in JavaScript store data as:", options: ["Ordered lists only","Key-value pairs","Binary blobs","SQL rows"], correctAnswerIndex: 1 },
        ],
      },
    ],
    finalExam: [
      { question: "What does typeof null return in JavaScript?", options: ["null","\"object\"","\"undefined\"","\"number\""], correctAnswerIndex: 1 },
      { question: "Which method adds an element to the end of an array?", options: ["shift","push","pop","unshift"], correctAnswerIndex: 1 },
      { question: "What is the result of \"5\" + 3 in JavaScript?", options: ["\"53\"","8","\"8\"","NaN"], correctAnswerIndex: 0 },
      { question: "Which keyword creates a constant binding?", options: ["let","var","const","static"], correctAnswerIndex: 2 },
      { question: "What does === check that == does not?", options: ["Variable name","Type as well as value","Memory address","Nothing different"], correctAnswerIndex: 1 },
      { question: "What is a callback function?", options: ["A function passed into another function to be run later","A function that calls itself","A deprecated feature","A CSS function"], correctAnswerIndex: 0 },
      { question: "Which of these creates an empty array?", options: ["{}","[]","()","null"], correctAnswerIndex: 1 },
      { question: "What does JSON.stringify do?", options: ["Parses a JSON string into an object","Converts a JS value into a JSON string","Deletes an object","Compares two objects"], correctAnswerIndex: 1 },
      { question: "What is the purpose of the reduce array method?", options: ["Filter elements","Accumulate array values into a single result","Sort elements","Reverse the array"], correctAnswerIndex: 1 },
      { question: "What does let provide that var does not?", options: ["Global scope","Block scope","Hoisting only","Faster execution"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "Python for Beginners",
    description: "Start writing Python from your very first script.",
    category: "Programming",
    modules: [
      {
        title: "Module 1: Syntax & Variables",
        videoUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
        lectureContent: "Python uses indentation instead of curly braces to define code blocks, which makes whitespace meaningful. Variables are dynamically typed, so a name can be reassigned to a value of a different type without declaring its type up front.",
        questions: [
          { question: "How does Python define code blocks?", options: ["Curly braces","Indentation","Semicolons","Parentheses"], correctAnswerIndex: 1 },
          { question: "What does \"dynamically typed\" mean?", options: ["Variables must declare a type","A variable's type is determined at runtime and can change","Python has no variables","Types are checked at compile time only"], correctAnswerIndex: 1 },
          { question: "Which symbol starts a comment in Python?", options: ["//","#","--","/*"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 2: Control Flow",
        videoUrl: "https://www.youtube.com/embed/PqFKRqpHrjw",
        lectureContent: "Python supports if/elif/else for branching and for/while loops for repetition. The for loop typically iterates directly over items in a sequence rather than using an index counter.",
        questions: [
          { question: "Which keyword chains an additional condition after if?", options: ["elseif","elif","else if","elwhile"], correctAnswerIndex: 1 },
          { question: "A Python for loop typically iterates over:", options: ["Only numeric ranges","Items in a sequence","Memory addresses","Nothing by default"], correctAnswerIndex: 1 },
          { question: "Which loop runs while a condition remains true?", options: ["for","while","switch","do"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: Functions & Modules",
        videoUrl: "https://www.youtube.com/embed/9Os0o3wzS_I",
        lectureContent: "Functions are defined with the def keyword and can accept default and keyword arguments. Modules let you organize code into reusable files that can be imported with the import statement.",
        questions: [
          { question: "Which keyword defines a function in Python?", options: ["func","def","function","lambda only"], correctAnswerIndex: 1 },
          { question: "How do you bring code from another file into your script?", options: ["include","import","require","using"], correctAnswerIndex: 1 },
          { question: "What is a default argument?", options: ["An argument that is always required","A parameter with a preset value used if none is provided","A global variable","A type hint"], correctAnswerIndex: 1 },
        ],
      },
    ],
    finalExam: [
      { question: "What does len() return for a list?", options: ["The last element","The number of elements","The first element","Nothing"], correctAnswerIndex: 1 },
      { question: "Which data structure is ordered and mutable in Python?", options: ["tuple","list","frozenset","int"], correctAnswerIndex: 1 },
      { question: "What does pip do in the Python ecosystem?", options: ["A testing framework","Python's package installer","A web server","A linter only"], correctAnswerIndex: 1 },
      { question: "What is a dictionary in Python?", options: ["An ordered list of numbers","A collection of key-value pairs","A type of loop","A function decorator"], correctAnswerIndex: 1 },
      { question: "Which keyword is used to handle exceptions?", options: ["catch","except","rescue","handle"], correctAnswerIndex: 1 },
      { question: "What does the range() function generate?", options: ["A string","A sequence of numbers","A dictionary","A file object"], correctAnswerIndex: 1 },
      { question: "How do you define an anonymous function in Python?", options: ["def","lambda","anon","func"], correctAnswerIndex: 1 },
      { question: "What is the result of 7 // 2 in Python?", options: ["3.5","3","4","0"], correctAnswerIndex: 1 },
      { question: "Which command creates a virtual environment?", options: ["python -m venv env","pip install env","python env","venv --new"], correctAnswerIndex: 0 },
      { question: "What does self refer to inside a class method?", options: ["The class itself","The current instance of the class","A global variable","Nothing, it's optional syntax"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "Node.js & Express",
    description: "Build REST APIs with Node.js and the Express framework.",
    category: "Backend Development",
    modules: [
      {
        title: "Module 1: Node Basics & Modules",
        videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
        lectureContent: "Node.js runs JavaScript outside the browser using the V8 engine, with a non-blocking, event-driven architecture suited to I/O-heavy workloads. CommonJS modules use require and module.exports to share code between files.",
        questions: [
          { question: "What engine does Node.js use to run JavaScript?", options: ["SpiderMonkey","V8","Chakra","JavaScriptCore"], correctAnswerIndex: 1 },
          { question: "Node's architecture is best described as:", options: ["Single-threaded and blocking","Non-blocking and event-driven","Strictly multi-threaded","Compiled ahead of time only"], correctAnswerIndex: 1 },
          { question: "Which syntax exports code from a CommonJS module?", options: ["export","module.exports","return","public"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 2: Building REST APIs with Express",
        videoUrl: "https://www.youtube.com/embed/pKd0Rpw7O48",
        lectureContent: "Express is a minimal web framework for Node.js that simplifies routing and request handling. Routes are defined by HTTP method and path, and route handlers receive request and response objects to read input and send a response.",
        questions: [
          { question: "What is Express primarily used for?", options: ["Styling web pages","Building web servers and APIs in Node.js","Managing databases directly","Compiling TypeScript"], correctAnswerIndex: 1 },
          { question: "An Express route handler typically receives which two objects?", options: ["req and res","input and output","get and post","client and server"], correctAnswerIndex: 0 },
          { question: "Which method defines a route that responds to GET requests?", options: ["app.get()","app.fetch()","app.read()","app.query()"], correctAnswerIndex: 0 },
        ],
      },
      {
        title: "Module 3: Middleware & Error Handling",
        videoUrl: "https://www.youtube.com/embed/lY6icfhap2o",
        lectureContent: "Middleware functions run between the incoming request and the final route handler, and can modify the request, end the response, or call next() to continue. A dedicated error-handling middleware with four arguments catches errors thrown anywhere in the chain.",
        questions: [
          { question: "What does middleware typically call to pass control to the next function?", options: ["return()","next()","continue()","done()"], correctAnswerIndex: 1 },
          { question: "How many arguments does an Express error-handling middleware function take?", options: ["2","3","4","1"], correctAnswerIndex: 2 },
          { question: "Middleware can be used to:", options: ["Only render HTML","Authenticate, log, or modify requests before the route handler runs","Replace the database","Only handle errors"], correctAnswerIndex: 1 },
        ],
      },
    ],
    finalExam: [
      { question: "What does app.use() register in Express?", options: ["A database connection","Middleware","A test suite","A CSS file"], correctAnswerIndex: 1 },
      { question: "Which HTTP method is typically used to create a new resource?", options: ["GET","POST","DELETE","OPTIONS"], correctAnswerIndex: 1 },
      { question: "What is the purpose of body-parsing middleware like express.json()?", options: ["Parses query strings","Parses incoming JSON request bodies","Compresses responses","Logs requests"], correctAnswerIndex: 1 },
      { question: "What does process.env typically expose?", options: ["Environment variables","The file system","Database records","The current route"], correctAnswerIndex: 0 },
      { question: "What status code indicates a successful resource creation?", options: ["200","201","404","500"], correctAnswerIndex: 1 },
      { question: "Which npm command installs dependencies listed in package.json?", options: ["npm start","npm install","npm build","npm test"], correctAnswerIndex: 1 },
      { question: "What is the purpose of a .env file?", options: ["Store compiled code","Store environment-specific configuration and secrets","Store HTML templates","Store test results"], correctAnswerIndex: 1 },
      { question: "Which Express method sends a JSON response?", options: ["res.json()","res.html()","res.css()","res.file()"], correctAnswerIndex: 0 },
      { question: "What does nodemon do during development?", options: ["Minifies code","Restarts the server automatically on file changes","Deploys to production","Runs unit tests"], correctAnswerIndex: 1 },
      { question: "What is a common reason to use async/await in route handlers?", options: ["To avoid using functions","To write asynchronous code that reads sequentially","To disable error handling","To skip middleware"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "MongoDB Essentials",
    description: "Model, query, and optimize data in MongoDB.",
    category: "Databases",
    modules: [
      {
        title: "Module 1: Documents & Collections",
        videoUrl: "https://www.youtube.com/embed/ofme2o29ngU",
        lectureContent: "MongoDB stores data as BSON documents, which are flexible JSON-like structures grouped into collections. Unlike relational tables, documents in the same collection don't have to share an identical schema.",
        questions: [
          { question: "What format does MongoDB use to store documents internally?", options: ["XML","BSON","CSV","YAML"], correctAnswerIndex: 1 },
          { question: "What is a MongoDB collection most similar to?", options: ["A single row","A table in a relational database","A column","A foreign key"], correctAnswerIndex: 1 },
          { question: "Do documents in the same MongoDB collection need an identical schema?", options: ["Yes, always","No, schemas can vary by document","Only if indexed","Only in production"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 2: CRUD Operations",
        videoUrl: "https://www.youtube.com/embed/FB6-7aAuZXk",
        lectureContent: "MongoDB's core operations are create, read, update, and delete, exposed through methods like insertOne, find, updateOne, and deleteOne. Queries are expressed as JavaScript-like objects describing the fields to match.",
        questions: [
          { question: "Which method inserts a single new document?", options: ["insertOne","find","updateOne","deleteOne"], correctAnswerIndex: 0 },
          { question: "Which method retrieves documents matching a query?", options: ["find","insertMany","drop","aggregate only"], correctAnswerIndex: 0 },
          { question: "What does updateOne typically require to apply changes?", options: ["Only a filter","A filter and an update operator like $set","Nothing","A full document replacement always"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: Indexes & Aggregation",
        videoUrl: "https://www.youtube.com/embed/A3jvoE0jGdE",
        lectureContent: "Indexes speed up queries by letting MongoDB avoid scanning every document, at the cost of extra storage and slower writes. The aggregation pipeline processes documents through stages like $match and $group to compute summaries.",
        questions: [
          { question: "What is the main benefit of adding an index?", options: ["Reduces storage forever","Speeds up queries on the indexed field","Removes the need for queries","Encrypts data"], correctAnswerIndex: 1 },
          { question: "What does the $match stage in an aggregation pipeline do?", options: ["Sorts documents","Filters documents like a query","Deletes documents","Creates an index"], correctAnswerIndex: 1 },
          { question: "A potential downside of adding many indexes is:", options: ["Faster reads only","Slower writes and more storage use","No downside exists","Indexes disable queries"], correctAnswerIndex: 1 },
        ],
      },
    ],
    finalExam: [
      { question: "What does the M in MERN stand for?", options: ["MySQL","MongoDB","Microsoft","Mocha"], correctAnswerIndex: 1 },
      { question: "Which command-line tool connects to a MongoDB instance interactively?", options: ["mongosh","mysql","psql","sqlite3"], correctAnswerIndex: 0 },
      { question: "What is a primary key called in MongoDB by default?", options: ["id","_id","pk","rowid"], correctAnswerIndex: 1 },
      { question: "Which method removes a single matching document?", options: ["deleteOne","removeAll","dropOne","clear"], correctAnswerIndex: 0 },
      { question: "What does Mongoose provide on top of MongoDB?", options: ["A new database engine","Schema validation and an object modeling layer","A replacement query language","A hosting platform"], correctAnswerIndex: 1 },
      { question: "What is a replica set used for?", options: ["Styling documents","High availability and redundancy","Faster JSON parsing","Encrypting passwords"], correctAnswerIndex: 1 },
      { question: "Which operator is used to set a field's value in an update?", options: ["$set","$get","$field","$value"], correctAnswerIndex: 0 },
      { question: "What does unique: true on a schema field enforce?", options: ["The field must be a string","No two documents can share that field's value","The field is required","The field is indexed but allows duplicates"], correctAnswerIndex: 1 },
      { question: "What is sharding in MongoDB used for?", options: ["Backups only","Horizontally scaling data across multiple servers","Formatting dates","Encrypting fields"], correctAnswerIndex: 1 },
      { question: "Which method counts documents matching a filter?", options: ["countDocuments","find","sum","total"], correctAnswerIndex: 0 },
    ],
  },

  {
    title: "Data Structures & Algorithms",
    description: "The core DS&A concepts behind efficient code.",
    category: "Computer Science",
    modules: [
      {
        title: "Module 1: Arrays & Linked Lists",
        videoUrl: "https://www.youtube.com/embed/RBSGKlAvoiM",
        lectureContent: "Arrays store elements in contiguous memory, giving fast index-based access but costly insertions in the middle. Linked lists store elements as nodes connected by pointers, making insertions cheap but lookups slower since they require traversal.",
        questions: [
          { question: "What is the main advantage of an array?", options: ["Cheap insertions in the middle","Fast constant-time index access","Infinite size by default","No memory usage"], correctAnswerIndex: 1 },
          { question: "What connects nodes in a linked list?", options: ["Indexes","Pointers/references","Hash codes","Array slots"], correctAnswerIndex: 1 },
          { question: "Why can looking up an element in a linked list be slow?", options: ["It requires traversal from the head","Linked lists don't store data","It uses binary search always","It requires sorting first"], correctAnswerIndex: 0 },
        ],
      },
      {
        title: "Module 2: Stacks & Queues",
        videoUrl: "https://www.youtube.com/embed/wjI1WNcIntg",
        lectureContent: "A stack follows last-in-first-out (LIFO) ordering, useful for things like undo history and function call tracking. A queue follows first-in-first-out (FIFO) ordering, useful for task scheduling and breadth-first traversal.",
        questions: [
          { question: "A stack follows which ordering principle?", options: ["FIFO","LIFO","Random","Sorted"], correctAnswerIndex: 1 },
          { question: "A queue follows which ordering principle?", options: ["LIFO","FIFO","Random","Sorted"], correctAnswerIndex: 1 },
          { question: "Which structure is naturally suited to breadth-first traversal?", options: ["Stack","Queue","Set","Tree only"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: Sorting & Searching",
        videoUrl: "https://www.youtube.com/embed/kgBjXUE_Nwc",
        lectureContent: "Sorting algorithms like quicksort and mergesort commonly run in O(n log n) time, while simpler algorithms like bubble sort run in O(n^2). Binary search finds an item in a sorted array in O(log n) time by repeatedly halving the search range.",
        questions: [
          { question: "What is the typical time complexity of mergesort?", options: ["O(n)","O(n log n)","O(n^2)","O(1)"], correctAnswerIndex: 1 },
          { question: "Binary search requires the input to be:", options: ["Sorted","Unsorted","A linked list","Hashed"], correctAnswerIndex: 0 },
          { question: "What is the time complexity of binary search?", options: ["O(n)","O(log n)","O(n^2)","O(1)"], correctAnswerIndex: 1 },
        ],
      },
    ],
    finalExam: [
      { question: "What does Big O notation describe?", options: ["Exact runtime in seconds","How an algorithm's resource use scales with input size","The programming language used","Memory addresses"], correctAnswerIndex: 1 },
      { question: "What is the time complexity of accessing an array element by index?", options: ["O(n)","O(1)","O(log n)","O(n^2)"], correctAnswerIndex: 1 },
      { question: "Which data structure uses LIFO ordering?", options: ["Queue","Stack","Linked list","Array"], correctAnswerIndex: 1 },
      { question: "What is a hash table primarily optimized for?", options: ["Ordered traversal","Fast average-case key lookup","Sorting","Sequential access only"], correctAnswerIndex: 1 },
      { question: "What does a binary search tree maintain?", options: ["Random order","A sorted structure enabling efficient search","No particular order","Only string data"], correctAnswerIndex: 1 },
      { question: "What is recursion?", options: ["A loop without a condition","A function that calls itself to solve smaller subproblems","A type of array","A sorting algorithm"], correctAnswerIndex: 1 },
      { question: "What is the worst-case time complexity of bubble sort?", options: ["O(n log n)","O(n^2)","O(n)","O(log n)"], correctAnswerIndex: 1 },
      { question: "Which traversal visits a tree's root before its children?", options: ["In-order","Pre-order","Post-order","Level-order only"], correctAnswerIndex: 1 },
      { question: "What is dynamic programming primarily used to avoid?", options: ["Using arrays","Redundant recomputation of overlapping subproblems","Using recursion entirely","Sorting data"], correctAnswerIndex: 1 },
      { question: "What is the space complexity concern with deep recursion?", options: ["None, it's free","Call stack usage can grow large","It uses no memory","It only affects CPU, not memory"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "Git & GitHub Basics",
    description: "Version control fundamentals for working on real teams.",
    category: "Developer Tools",
    modules: [
      {
        title: "Module 1: Git Fundamentals",
        videoUrl: "https://www.youtube.com/embed/8JJ101D3knE",
        lectureContent: "Git tracks changes to files over time through commits, each capturing a snapshot of the project. The staging area lets you choose exactly which changes to include in the next commit before running git commit.",
        questions: [
          { question: "What does a Git commit represent?", options: ["A deleted file","A snapshot of changes at a point in time","A remote server","A branch name"], correctAnswerIndex: 1 },
          { question: "What is the purpose of the staging area?", options: ["To permanently delete files","To choose which changes go into the next commit","To back up the entire OS","To compile code"], correctAnswerIndex: 1 },
          { question: "Which command shows the current status of staged/unstaged changes?", options: ["git log","git status","git diff only","git branch"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 2: Branching & Merging",
        videoUrl: "https://www.youtube.com/embed/e2IbNHi4uCI",
        lectureContent: "Branches let you develop features in isolation from the main codebase. Merging combines changes from one branch into another, and conflicts arise when the same lines were changed differently on both sides.",
        questions: [
          { question: "What is the purpose of a branch in Git?", options: ["To delete history","To develop changes in isolation from main","To compress files","To create a backup only"], correctAnswerIndex: 1 },
          { question: "What causes a merge conflict?", options: ["Two branches having the same name","The same lines being changed differently on both branches","Using too many commits","Branching from main"], correctAnswerIndex: 1 },
          { question: "Which command creates and switches to a new branch in one step?", options: ["git branch","git checkout -b","git merge","git clone"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: Collaborating on GitHub",
        videoUrl: "https://www.youtube.com/embed/MnUd31TvBoU",
        lectureContent: "A pull request proposes merging changes from one branch into another and gives collaborators a place to review and discuss the code. Forking creates your own copy of someone else's repository to work on independently.",
        questions: [
          { question: "What does a pull request let collaborators do?", options: ["Delete the repository","Review and discuss proposed changes before merging","Bypass code review","Rename the project"], correctAnswerIndex: 1 },
          { question: "What does forking a repository create?", options: ["A branch on the original repo","Your own independent copy of the repository","A pull request automatically","A deleted repo"], correctAnswerIndex: 1 },
          { question: "Which command uploads local commits to a remote repository?", options: ["git pull","git push","git fetch","git clone"], correctAnswerIndex: 1 },
        ],
      },
    ],
    finalExam: [
      { question: "What command initializes a new Git repository?", options: ["git start","git init","git new","git create"], correctAnswerIndex: 1 },
      { question: "Which command downloads changes from a remote without merging them?", options: ["git fetch","git push","git commit","git stage"], correctAnswerIndex: 0 },
      { question: "What does git clone do?", options: ["Deletes a repository","Creates a local copy of a remote repository","Merges two branches","Stages all files"], correctAnswerIndex: 1 },
      { question: "What is a .gitignore file used for?", options: ["Listing files Git should not track","Listing required dependencies","Storing commit messages","Configuring branches"], correctAnswerIndex: 0 },
      { question: "What does git pull do under the hood?", options: ["Only fetches, nothing else","A fetch followed by a merge","Deletes local changes","Creates a new branch"], correctAnswerIndex: 1 },
      { question: "What identifies a specific commit uniquely?", options: ["Its branch name","A SHA hash","The author's name","The file size"], correctAnswerIndex: 1 },
      { question: "What is the default branch commonly called in newer repositories?", options: ["trunk","main","master only","root"], correctAnswerIndex: 1 },
      { question: "What does git revert do, compared to git reset?", options: ["Deletes history permanently","Creates a new commit that undoes a previous one","Renames a branch","Deletes the repository"], correctAnswerIndex: 1 },
      { question: "What is a remote in Git?", options: ["A local branch","A reference to a repository hosted elsewhere","A type of commit","A merge conflict"], correctAnswerIndex: 1 },
      { question: "Why might a team use a code review process via pull requests?", options: ["To slow down development for no reason","To catch issues and share knowledge before merging","To avoid using Git","To delete unwanted branches"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "REST API Design",
    description: "Design clean, predictable APIs that clients love to use.",
    category: "Backend Development",
    modules: [
      {
        title: "Module 1: REST Principles",
        videoUrl: "https://www.youtube.com/embed/-MTSQjw5DrM",
        lectureContent: "REST treats data as resources identified by URLs, manipulated through standard HTTP methods. A well-designed REST API is stateless, meaning each request contains all the information needed to process it.",
        questions: [
          { question: "In REST, what represents data?", options: ["Functions","Resources identified by URLs","SQL queries","Cookies only"], correctAnswerIndex: 1 },
          { question: "What does \"stateless\" mean for a REST API?", options: ["Each request contains everything needed to process it","The server remembers every past request","There is no server","Requests must be sequential"], correctAnswerIndex: 0 },
          { question: "REST primarily relies on which protocol?", options: ["FTP","HTTP","SMTP","SSH"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 2: Status Codes & Methods",
        videoUrl: "https://www.youtube.com/embed/LtNSd_4txVc",
        lectureContent: "HTTP methods like GET, POST, PUT, PATCH, and DELETE map to common CRUD operations on a resource. Status codes communicate the outcome of a request, with 2xx for success, 4xx for client errors, and 5xx for server errors.",
        questions: [
          { question: "Which method is typically used to partially update a resource?", options: ["GET","PATCH","DELETE","OPTIONS"], correctAnswerIndex: 1 },
          { question: "What does a 404 status code indicate?", options: ["Server error","Resource not found","Successful creation","Unauthorized access"], correctAnswerIndex: 1 },
          { question: "What range do client error status codes fall in?", options: ["2xx","3xx","4xx","5xx"], correctAnswerIndex: 2 },
        ],
      },
      {
        title: "Module 3: Authentication & Versioning",
        videoUrl: "https://www.youtube.com/embed/7Q17ubqLfaM",
        lectureContent: "Token-based authentication, such as JWTs, lets a client prove its identity on each request without the server storing session state. API versioning, often via the URL path, lets you evolve an API without breaking existing clients.",
        questions: [
          { question: "What does a JWT let a client do?", options: ["Store data in the database","Prove its identity on each request without server-side sessions","Bypass HTTPS","Compress responses"], correctAnswerIndex: 1 },
          { question: "Why version an API?", options: ["To make it slower on purpose","To evolve the API without breaking existing clients","To hide the documentation","To remove authentication"], correctAnswerIndex: 1 },
          { question: "A common way to version a REST API is:", options: ["Via the URL path, e.g. /v1/","Randomly per request","By changing the database name","By disabling old endpoints immediately"], correctAnswerIndex: 0 },
        ],
      },
    ],
    finalExam: [
      { question: "Which HTTP method is idempotent and used to fully replace a resource?", options: ["POST","PUT","PATCH","CONNECT"], correctAnswerIndex: 1 },
      { question: "What does idempotent mean for an HTTP method?", options: ["It runs only once ever","Repeating the same request produces the same result","It always fails the second time","It requires authentication"], correctAnswerIndex: 1 },
      { question: "What status code indicates the request succeeded with no content to return?", options: ["200","204","301","401"], correctAnswerIndex: 1 },
      { question: "What is the purpose of an HTTP header like Authorization?", options: ["Style the response","Carry credentials or tokens for the request","Define the request body format only","Cache the response"], correctAnswerIndex: 1 },
      { question: "What does CORS control?", options: ["Database access","Which origins are allowed to make cross-origin requests to your API","File compression","Password hashing"], correctAnswerIndex: 1 },
      { question: "What is a typical use of query parameters in a REST API?", options: ["Filtering, sorting, or paginating a collection","Authenticating requests exclusively","Replacing the request body entirely","Defining the HTTP method"], correctAnswerIndex: 0 },
      { question: "What does a 401 status code mean?", options: ["Resource not found","Unauthorized — authentication is required or failed","Server error","Successful request"], correctAnswerIndex: 1 },
      { question: "What does a 500 status code generally indicate?", options: ["Client made a bad request","An unexpected error occurred on the server","The resource moved permanently","The request succeeded"], correctAnswerIndex: 1 },
      { question: "Why prefer plural nouns in REST resource URLs (e.g. /courses)?", options: ["It's required by HTTP","It's a common convention representing a collection of resources","It makes requests faster","It's needed for authentication"], correctAnswerIndex: 1 },
      { question: "What is rate limiting used for in an API?", options: ["Styling responses","Protecting the API from being overwhelmed by too many requests","Sorting results","Encrypting payloads"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "Docker Fundamentals",
    description: "Package and run applications consistently with Docker.",
    category: "DevOps",
    modules: [
      {
        title: "Module 1: Containers & Images",
        videoUrl: "https://www.youtube.com/embed/gAkwW2tuIqE",
        lectureContent: "A container packages an application with everything it needs to run, isolated from the host system but sharing its kernel, making it much lighter than a full virtual machine. An image is the read-only template a container is created from.",
        questions: [
          { question: "What does a container share with the host system?", options: ["Nothing at all","The kernel","A full separate operating system","Only the file system"], correctAnswerIndex: 1 },
          { question: "What is a Docker image?", options: ["A running process","A read-only template used to create containers","A virtual machine","A network configuration"], correctAnswerIndex: 1 },
          { question: "Why are containers generally lighter than virtual machines?", options: ["They include a full guest OS","They share the host kernel instead of virtualizing hardware","They don't run any code","They are always smaller files regardless of content"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 2: Dockerfiles",
        videoUrl: "https://www.youtube.com/embed/EiIxCSBFfzs",
        lectureContent: "A Dockerfile is a script of instructions describing how to build an image, such as which base image to start from, what files to copy in, and what command to run when a container starts. Each instruction typically creates a new cached layer.",
        questions: [
          { question: "What does a Dockerfile describe?", options: ["A running container's logs","The instructions to build an image","A network's firewall rules","A database schema"], correctAnswerIndex: 1 },
          { question: "What does the FROM instruction specify?", options: ["The final command to run","The base image to build on top of","The container's name","The exposed port"], correctAnswerIndex: 1 },
          { question: "What is the benefit of Docker's layer caching?", options: ["It makes images larger","It can speed up rebuilds by reusing unchanged layers","It deletes old images automatically","It encrypts the image"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: Docker Compose",
        videoUrl: "https://www.youtube.com/embed/HG6yIjZapSA",
        lectureContent: "Docker Compose lets you define and run multi-container applications using a single YAML file, describing each service, its image or build context, and how services connect to each other.",
        questions: [
          { question: "What format does Docker Compose use for its configuration?", options: ["JSON only","YAML","XML","INI"], correctAnswerIndex: 1 },
          { question: "What is Docker Compose primarily useful for?", options: ["Running a single isolated container","Defining and running multi-container applications together","Compiling source code","Replacing Git"], correctAnswerIndex: 1 },
          { question: "In a typical Compose setup for a web app, what might a second service represent?", options: ["A database","Always another copy of the same app","Nothing","A CSS file"], correctAnswerIndex: 0 },
        ],
      },
    ],
    finalExam: [
      { question: "What command builds a Docker image from a Dockerfile?", options: ["docker run","docker build","docker pull","docker start"], correctAnswerIndex: 1 },
      { question: "What does docker run do?", options: ["Builds an image","Starts a new container from an image","Deletes a container","Pushes an image to a registry"], correctAnswerIndex: 1 },
      { question: "What is Docker Hub?", options: ["A local-only image store","A public registry for sharing Docker images","A type of container","A monitoring tool"], correctAnswerIndex: 1 },
      { question: "What does the EXPOSE instruction in a Dockerfile do?", options: ["Opens a port on the host firewall","Documents which port the container listens on","Deletes a port","Starts the container"], correctAnswerIndex: 1 },
      { question: "What is a volume used for in Docker?", options: ["Increasing CPU allocation","Persisting data outside a container's writable layer","Compiling code","Networking only"], correctAnswerIndex: 1 },
      { question: "What command lists currently running containers?", options: ["docker ps","docker images","docker logs","docker network"], correctAnswerIndex: 0 },
      { question: "What happens to data in a container's writable layer when it's removed, without a volume?", options: ["It persists forever","It is lost","It's automatically backed up","It moves to the image"], correctAnswerIndex: 1 },
      { question: "What is the purpose of docker-compose up?", options: ["Builds and starts all services defined in the compose file","Deletes all containers","Pushes images only","Stops all containers"], correctAnswerIndex: 0 },
      { question: "What does tagging an image (e.g. myapp:1.0) help with?", options: ["Versioning and identifying specific image builds","Encrypting the image","Compiling it faster","Nothing useful"], correctAnswerIndex: 0 },
      { question: "Why might you use a multi-stage Dockerfile build?", options: ["To make the final image larger","To keep the final image smaller by discarding build-only dependencies","To run multiple containers at once","To avoid using a base image"], correctAnswerIndex: 1 },
    ],
  },

  {
    title: "Cloud Computing with AWS",
    description: "Get hands-on with the core building blocks of AWS.",
    category: "Cloud Computing",
    modules: [
      {
        title: "Module 1: Cloud Concepts",
        videoUrl: "https://www.youtube.com/embed/M988_fsOSWo",
        lectureContent: "Cloud computing provides on-demand access to computing resources like servers and storage over the internet, billed based on usage rather than upfront hardware purchases. Common service models include IaaS, PaaS, and SaaS.",
        questions: [
          { question: "What is a key benefit of cloud computing billing?", options: ["Fixed cost regardless of usage","Pay based on actual usage rather than upfront hardware","No cost at all","One-time payment for a lifetime license"], correctAnswerIndex: 1 },
          { question: "What does IaaS stand for?", options: ["Internet as a Service","Infrastructure as a Service","Identity as a Service","Integration as a Service"], correctAnswerIndex: 1 },
          { question: "Which service model gives the most control over the underlying infrastructure?", options: ["SaaS","PaaS","IaaS","None of them"], correctAnswerIndex: 2 },
        ],
      },
      {
        title: "Module 2: EC2 & S3",
        videoUrl: "https://www.youtube.com/embed/iHX-jtKIVNA",
        lectureContent: "EC2 provides resizable virtual servers in the cloud for running applications, while S3 provides scalable object storage for files like images, backups, and static assets.",
        questions: [
          { question: "What does EC2 primarily provide?", options: ["Object storage","Resizable virtual servers","A managed database","A DNS service only"], correctAnswerIndex: 1 },
          { question: "What does S3 primarily provide?", options: ["Virtual servers","Scalable object storage","A firewall","A container runtime"], correctAnswerIndex: 1 },
          { question: "Which AWS service would you typically use to store user-uploaded files?", options: ["EC2","S3","IAM","VPC"], correctAnswerIndex: 1 },
        ],
      },
      {
        title: "Module 3: IAM & Security Basics",
        videoUrl: "https://www.youtube.com/embed/iF9fs8Rw4Uo",
        lectureContent: "IAM controls who can access which AWS resources and what actions they're allowed to perform, following the principle of least privilege. Security groups act as virtual firewalls controlling inbound and outbound traffic.",
        questions: [
          { question: "What does IAM primarily manage?", options: ["Network speed","Who can access which resources and what they can do","Billing currency","Server CPU usage"], correctAnswerIndex: 1 },
          { question: "What does the principle of least privilege mean?", options: ["Granting all permissions by default","Granting only the access necessary to perform a task","Disabling all access","Sharing one root account for everyone"], correctAnswerIndex: 1 },
          { question: "What is a security group in AWS?", options: ["A team of developers","A virtual firewall controlling traffic to a resource","A billing plan","A type of database"], correctAnswerIndex: 1 },
        ],
      },
    ],
    finalExam: [
      { question: "What does AWS stand for?", options: ["Amazon Web Services","Advanced Web Systems","Automated Web Servers","Amazon Worldwide Storage"], correctAnswerIndex: 0 },
      { question: "What is generally recommended for everyday administrative tasks instead of the AWS root account?", options: ["Using IAM users or roles","Sharing the root password with the whole team","Deleting the root account","Disabling billing alerts"], correctAnswerIndex: 0 },
      { question: "What does a Region represent in AWS?", options: ["A single server","A geographic area containing multiple data centers","A pricing tier","A type of storage"], correctAnswerIndex: 1 },
      { question: "What is an Availability Zone?", options: ["An isolated data center location within a region","A type of EC2 instance","A billing alert","A security group"], correctAnswerIndex: 0 },
      { question: "Which AWS service is commonly used for serverless compute?", options: ["EC2","Lambda","S3","IAM"], correctAnswerIndex: 1 },
      { question: "What does auto scaling help achieve?", options: ["Manually resizing servers only","Automatically adjusting capacity based on demand","Deleting unused accounts","Encrypting data at rest"], correctAnswerIndex: 1 },
      { question: "What is the purpose of a VPC?", options: ["An isolated virtual network environment for your resources","A type of storage bucket","A billing dashboard","A monitoring tool only"], correctAnswerIndex: 0 },
      { question: "Which AWS service provides managed relational databases?", options: ["S3","RDS","IAM","CloudFront"], correctAnswerIndex: 1 },
      { question: "What does CloudWatch primarily provide?", options: ["Monitoring and logging for AWS resources","Object storage","Identity management","A CDN"], correctAnswerIndex: 0 },
      { question: "Why use multiple Availability Zones for an application?", options: ["To reduce cost only","To improve fault tolerance and availability","It's required by AWS for all accounts","To avoid using IAM"], correctAnswerIndex: 1 },
    ],
  },
]