# Dominoes

Create a single page application to show domino cards like the following example :

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXc4mahjSKfUbywKjPu_fyyrBbUaCjdl0JGoSs7TozRMXoxRC6I8hv9W66G2Y6EMiLK_K7I-wegh-K6zQek2vhGKFxcWKfkiXIENZ6dKSySi0o_jTrE1u1ZkjGvQqX2FkNQrZHqt5TjIYHKR60J9WLRMrAc?key=UhueeHCPVEW9vh5a1FkZpQ)

Write the code in the CodeSandbox based on the template provided :

<https://codesandbox.io/s/dominoes-student-template-92gg8y>

# Features

### Show all domino cards

The application will display all domino cards based on the data provided.

### Show how many double numbers appear

The application will display how many double numbers appear.

Example :

[1, 2] [1, 1] [4, 1] [3, 3] [6, 1] → 2

[5, 1] [3, 2] [2, 3] [3, 1] [5, 1] → 0

### Sort data (asc & desc)

Users can sort the domino cards in ascending or descending order.

Sorting rules :

- Sorting domino cards based on the total number on each card

- Prioritize domino cards with smaller numbers (asc) or larger numbers (desc)

Example :

Source : [3, 4] [1, 2] [1, 6]

Asc Order : [1, 2] [1, 6] [3, 4]

Desc Order : [3, 4] [1, 6] [1, 2]

### Remove duplicate

Users can remove domino cards with the same total number and number combination.

Example : [1,2][1,2][2,1][1,3] → [1,3]

### Flip the cards

Example : [1,2][1,2][2,1][1,3] → [2,1][2,1][1,2][3,1]

### Remove cards with certain total number

Example : [1,2][2,2][2,1][1,3] → remove 4 → [1,2][2,1]

### Reset data

Users can reset the data to default data.
