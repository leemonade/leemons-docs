"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[950],{1424:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return r},default:function(){return c},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return d}});var a=n(7462),l=n(3366),s=(n(7294),n(3905)),i=["components"],o={sidebar_position:3,sidebar_label:"leemons-connector-bookshelf"},r="Bookshelf Connector package",p={unversionedId:"develop/packages/leemons-connector-bookshelf",id:"develop/packages/leemons-connector-bookshelf",title:"Bookshelf Connector package",description:"The leemons-connector-bookshelf package is a SQL abstraction layer, which will be in charge of managing connections and queries to the database.",source:"@site/docs/develop/packages/leemons-connector-bookshelf.mdx",sourceDirName:"develop/packages",slug:"/develop/packages/leemons-connector-bookshelf",permalink:"/leemons-docs/es/develop/packages/leemons-connector-bookshelf",draft:!1,editUrl:"https://github.com/leemonade/leemons-docs/tree/main/docs/develop/packages/leemons-connector-bookshelf.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"leemons-connector-bookshelf"},sidebar:"tutorialSidebar",previous:{title:"leemons-database",permalink:"/leemons-docs/es/develop/packages/leemons-database"},next:{title:"leemons-utils",permalink:"/leemons-docs/es/develop/packages/leemons-utils"}},u={},d=[{value:"Initialization",id:"initialization",level:2},{value:"Models Generation",id:"models-generation",level:2},{value:"Definition of templates",id:"definition-of-templates",level:2},{value:"Data types",id:"datatypes",level:3},{value:"Options",id:"options",level:3},{value:"Specific data types",id:"specific-datatypes",level:3},{value:"Relationships between tables",id:"relationships-between-tables",level:3},{value:"Relationships",id:"relationships",level:4}],h={toc:d};function c(e){var t=e.components,n=(0,l.Z)(e,i);return(0,s.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"bookshelf-connector-package"},"Bookshelf Connector package"),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"leemons-connector-bookshelf")," package is a SQL abstraction layer, which will be in charge of managing connections and queries to the database."),(0,s.kt)("p",null,"To perform this abstraction, we use the ",(0,s.kt)("a",{parentName:"p",href:"https://bookshelfjs.org"},"bookshelf.js")," ORM and the ",(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org"},"knex.js")," query builder."),(0,s.kt)("h2",{id:"initialization"},"Initialization"),(0,s.kt)("p",null,"When the connector is initialized, it connects leemons with each of the specified database connections."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"What database engines are supported?"),(0,s.kt)("p",{parentName:"li"},"Currently we have tested compatibility with ",(0,s.kt)("a",{parentName:"p",href:"https://www.mysql.com/"},"MySql"),", ",(0,s.kt)("a",{parentName:"p",href:"https://www.postgresql.org/"},"PostgreSQL")," and ",(0,s.kt)("a",{parentName:"p",href:"https://sqlite.org/"},"SQLite3"),".")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("p",{parentName:"li"},"But how does it work?"),(0,s.kt)("p",{parentName:"li"},"Well, the first thing to do is to initialize a knex object with the database connection data, once everything is ready, we proceed in creating the schema from the models provided. During the creation of the schema, the relationships between tables are created and the bookshelf models are instantiated to manage the queries."))),(0,s.kt)("h2",{id:"models-generation"},"Models Generation"),(0,s.kt)("p",null,"To generate the database, the first thing to do is to check the current database schema, which we do in the following order:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"The ",(0,s.kt)("a",{parentName:"li",href:"leemons/#models"},"user-defined models")," are obtained."),(0,s.kt)("li",{parentName:"ol"},"A transaction is started to keep an open thread and to enable a return to the previous state in case of failure."),(0,s.kt)("li",{parentName:"ol"},"For each model defined, a check is made to see if a corresponding table exists in the database."),(0,s.kt)("li",{parentName:"ol"},"A check is performed to confirm if the model has been altered since the previous execution, which is stored in the ",(0,s.kt)("inlineCode",{parentName:"li"},"core_store"),"."),(0,s.kt)("li",{parentName:"ol"},"The tables that need it are created or modified (based on points 2 and 3)."),(0,s.kt)("li",{parentName:"ol"},"The ",(0,s.kt)("a",{parentName:"li",href:"https://bookshelfjs.org/api.html#Bookshelf-instance-model"},"bookshelf model")," is generated."),(0,s.kt)("li",{parentName:"ol"},"The foreign keys are created.")),(0,s.kt)("h2",{id:"definition-of-templates"},"Definition of templates"),(0,s.kt)("p",null,"The models are used to define the structure of your tables, for this it is necessary to ",(0,s.kt)("a",{parentName:"p",href:"leemons/#models"},"define them")," as indicated in the leemons documentation."),(0,s.kt)("p",null,"Next, it is necessary to define the different columns that your table is going to have, this is done in the ",(0,s.kt)("inlineCode",{parentName:"p"},"attributes")," property being able to choose one of the defined ",(0,s.kt)("a",{parentName:"p",href:"#datatypes"},"data types")," or set a ",(0,s.kt)("a",{parentName:"p",href:"#specific-datatypes"},"specific type"),", next to these, we can specify some ",(0,s.kt)("a",{parentName:"p",href:"#options"},"options per data"),". Instead of data, you can define a relationship with another table, this is achieved by the ",(0,s.kt)("a",{parentName:"p",href:"#relationship-relationship-between-tables"},"relationship declaration"),"."),(0,s.kt)("p",null,"For example: In the users table we have the fields: first name, last name and course."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "modelName": "users",\n  "attributes": {\n    "name": {\n      "type": "string"\n    },\n    "surnames": {\n      "type": "string"\n    },\n    "course": {\n      "type": "integer"\n    }\n  }\n}\n')),(0,s.kt)("h3",{id:"datatypes"},"Data types"),(0,s.kt)("p",null,"We have selected most of the data types provided by Knex.js, in an attempt to get the most efficient data types to be used, these are the following:"),(0,s.kt)("details",null,(0,s.kt)("summary",null,"string"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#string"},"string")),(0,s.kt)("p",null,"Specifies the use of strings of the specified length (default 255 characters)."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "name": {\n      "type": "string",\n      "length": 255\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"text/richtext"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#text"},"text/richtext")),(0,s.kt)("p",null,"Specifies the use of strings with a variable determined by SQL, this type is more efficient for long texts (default 65535 characters)."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "name": {\n      "type": "text",\n      "textType": "text" // possible values: "mediumtext" y "longtext"\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"enum/enu/enumeration"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#enum-enu"},"enum/enu/enumeration")),(0,s.kt)("p",null,"Defines the possible values that a field can accept:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    // role can be only student, teacher or admin.\n    "role": {\n      "type": "enum",\n      "enum": ["student", "teacher", "admin"]\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"json/jsonb"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#json"},"json/jsonb")),(0,s.kt)("p",null,"It allows to use the database engine's own JSON data type, thus obtaining some extra functionalities from the engine."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    // `metadata` can be a json that allows more efficient\n    // queries to certain properties of the metadata.\n    "metadata": {\n      "type": "json"\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"int/integer"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#integer"},"int/integer")),(0,s.kt)("p",null,"Specifies that the data is a number."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "course": {\n      "type": "int"\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"bigint/biginteger"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#biginteger"},"bigint/biginteger")),(0,s.kt)("p",null,"You can also use larger numbers (they have a much higher limit)."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    // A number that is so large that in JavaScript\n    // must be treated as a string.\n    "bigInt": {\n      "type": "bigInt"\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"float"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#float"},"float")),(0,s.kt)("p",null,"Allows the declaration of a float with a precision and a scale."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "evaluation": {\n      "type": "float",\n      "precision": 8,\n      "scale": 2\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"decimal"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#decimal"},"decimal")),(0,s.kt)("p",null,"Allows the declaration of a decimal number with a precision and a scale."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "evaluation": {\n      "type": "decimal",\n      "precision": 8,\n      "scale": 2\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"binary"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#binary"},"binary")),(0,s.kt)("p",null,"Sets a binary field with a specified length."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "file": {\n      "type": "binary",\n      "length": 255\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"boolean"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#boolean"},"boolean")),(0,s.kt)("p",null,"Sets a boolean field (true or false)"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "attendance": {\n      "type": "boolean"\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"uuid"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#uuid"},"uuid")),(0,s.kt)("p",null,"Allows to declare a UUID (Universally Unique Identifier)."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "user_id": {\n      "type": "uuid"\n    }\n  }\n}\n'))),(0,s.kt)("h3",{id:"options"},"Options"),(0,s.kt)("p",null,"In addition to specifying the data type, we can specify some more concrete options within the attribute with the ",(0,s.kt)("inlineCode",{parentName:"p"},"options")," property, there are the following options:"),(0,s.kt)("details",null,(0,s.kt)("summary",null,"unique"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#unique"},"unique")),(0,s.kt)("p",null,"Indicates whether the column should have a unique value throughout the table."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    "title": {\n      "type": "string",\n      "options": {\n        "unique": true\n      }\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"defaultTo"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#defaultto"},"defaultTo")),(0,s.kt)("p",null,"Indicates the default value in the case that no value is specified in the insertion."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    // If no role is specified, it is filled as \'student\'.\n    "role": {\n      "type": "string",\n      "options": {\n        "defaultTo": "student"\n      }\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"unsigned"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#unsigned"},"unsigned")),(0,s.kt)("p",null,"Indicates whether the field value should be signed or unsigned (applicable for numeric values)."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    // In this case positive numerical values are accepted (>= 0).\n    "id": {\n      "type": "int",\n      "options": {\n        "unsigned": true\n      }\n    }\n  }\n}\n'))),(0,s.kt)("details",null,(0,s.kt)("summary",null,"notNull/notNullable"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#notnullable"},"notNull/notNullable")),(0,s.kt)("p",null,"Specifies whether the field can (true) or cannot be null (false) (default is can (false))."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "attributes": {\n    // Email is required (cannot be null)\n    "email": {\n      "type": "string",\n      "options": {\n        "notNull": true\n      }\n    },\n    // While the phone is optional (can be null)\n    "phone": {\n      "type": "int",\n      "options": {\n        "notNull": false\n      }\n    }\n  }\n}\n'))),(0,s.kt)("h3",{id:"specific-datatypes"},"Specific data types"),(0,s.kt)("p",null,"If you prefer to use a non-provided data type, it is possible to use a more specific one by using the ",(0,s.kt)("inlineCode",{parentName:"p"},"specificType")," property following ",(0,s.kt)("a",{parentName:"p",href:"https://knexjs.org/guide/schema-builder.html#specifictype"},"Knex.js instructions")),(0,s.kt)("h3",{id:"relationships-between-tables"},"Relationships between tables"),(0,s.kt)("p",null,"In certain occasions it will be necessary to relate several tables, we have made it as easy as possible without losing the original essence. Instead of defining a type in an attribute of the table, you define a reference:"),(0,s.kt)("p",null,"Let's see how you would define a relationship between the users and roles table."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "modelName": "users",\n  "attributes": {\n    "roles": {\n      "references": {\n        "collection": "roles"\n      }\n    }\n  }\n}\n')),(0,s.kt)("h4",{id:"relationships"},"Relationships"),(0,s.kt)("p",null,"Relationships between tables are a very important feature in SQL databases, they allow the creation of relationships between data avoiding redundancy as much as possible."),(0,s.kt)("p",null,"If you have already worked with SQL you will already know the different relationships. Here are the different relationships and how to establish them:"),(0,s.kt)("details",null,(0,s.kt)("summary",null,"one-to-one"),(0,s.kt)("p",null,"In this type of relationship, ",(0,s.kt)("strong",{parentName:"p"},"one data")," in a table A is directly related to ",(0,s.kt)("strong",{parentName:"p"},"one data")," in another table B, moreover, there can only be one relationship for each data in table A and only one for each data in table B. In this type of relation it is said that a data belongs to another one."),(0,s.kt)("p",null,"For example: a student has a locker and a locker belongs to only one student. As the locker belongs to the student, it will be this table that creates the relationship, in the locker table the relationship is not specified."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "modelName": "students",\n  "attributes": {\n    "locker": {\n      // It could be read as: a locker belongs to a single student.\n      "references": {\n        "collection": "lockers",\n        "relation": "one to one"\n      }\n    }\n  }\n}\n')),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"What is going on inside?")),(0,s.kt)("p",null,'On the inside, a field is being created in the students table called "locker" (as specified), this is a foreign key of the "lockers" table, in addition, a unique key is created to preserve uniqueness.')),(0,s.kt)("details",null,(0,s.kt)("summary",null,"one-to-many"),(0,s.kt)("p",null,"The one-to-many relationship directly relates ",(0,s.kt)("strong",{parentName:"p"},"one data")," in a table A with ",(0,s.kt)("strong",{parentName:"p"},"several")," in a table B, there can be as many relationships for each data in A as there are data in B, but each data in B can only relate to one in A."),(0,s.kt)("p",null,"For example: a student belongs to a single class, but a class belongs to several students. In this case, it would be the class that has the one-to-many relationship, but trying to keep all the relationships in the same table, it would be the student table that creates the relationship."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "modelName": "students",\n  "attributes": {\n    "classroom": {\n      // It could be read as: a classroom has several students\n      "references": {\n        "collection": "classrooms",\n        "relation": "one to many"\n      }\n    }\n  }\n}\n')),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"What is going on inside?")),(0,s.kt)("p",null,'On the back end a field is being created in the students table called "class" (as specified), this is a foreign key of the "classes" table.')),(0,s.kt)("details",null,(0,s.kt)("summary",null,"many-to-many"),(0,s.kt)("p",null,"Finally, you may have situations where ",(0,s.kt)("strong",{parentName:"p"},"several data")," in table A are related to ",(0,s.kt)("strong",{parentName:"p"},"several data")," in table B. In this case, a third table is needed to store the relationships."),(0,s.kt)("p",null,"For example: A user can be enrolled in several subjects, and in turn, a subject can be given by several users, in this case it is irrelevant who declares the relationship, but as always, we recommend creating as many relationships as possible in the same model."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "modelName": "students",\n  "attributes": {\n    "subject": {\n      // It could be read as: several students attend several subjects\n      "references": {\n        "collection": "subjects",\n        "relation": "many to many"\n      }\n    }\n  }\n}\n')),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"What is going on inside?")),(0,s.kt)("p",null,"Inside a table is created that contains a foreign key to the other two tables, thus being a join table, this table stores the relationships between the other two tables.")),(0,s.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"TIP")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"When deciding who should define the relationship, always follow these guidelines:"),(0,s.kt)("ul",{parentName:"div"},(0,s.kt)("li",{parentName:"ul"},"The second table you mention usually declares the relationship (a locker belongs to a single student)."),(0,s.kt)("li",{parentName:"ul"},"You should always choose to have as many relationships as possible in the same table, so it is advisable to start declaring the relationships in order of: ",(0,s.kt)("inlineCode",{parentName:"li"},"one-to-many"),", ",(0,s.kt)("inlineCode",{parentName:"li"},"one-to-one")," and finally ",(0,s.kt)("inlineCode",{parentName:"li"},"many-to-many"),"."),(0,s.kt)("li",{parentName:"ul"},"The ",(0,s.kt)("inlineCode",{parentName:"li"},"one-to-many")," are usually declared in the 'many' table and not in the 'one' table (many students in a class, one class many students. Always in the students table).")))))}c.isMDXComponent=!0}}]);