$\color{#8ECAE6}\large{\texttt{❯ Server}}$

# Get an Initial Avatar

Generate an Initial Avatar

![](/.github/assets/separator.svg)

$\normalsize{\texttt{{\color{#8ECAE6}\\{protocol\\}}{\color{#9FA3A4}://}{\color{#8ECAE6}\\{hostname\\}}{\color{#9FA3A4}:}{\color{#8ECAE6}\\{port\\}}}}$

![](/.github/assets/http-get.svg)
$\Large{\texttt{{\color{#1E1E1E}| }{\color{#FFFFFF}/avatar/:hexColor/:content/:size}}}$

![](/.github/assets/separator.svg)

## Path Parameters

$\large{\texttt{\color{#8ECAE6}hexColor}}$
![](/.github/assets/tags-string.svg)
![](/.github/assets/tags-required.svg)

The background color of the profile picture (hexadecimal format: FFFFFF = white).

![](/.github/assets/separator.svg)

$\large{\texttt{\color{#8ECAE6}content}}$
![](/.github/assets/tags-string.svg)
![](/.github/assets/tags-required.svg)

The content of the profile picture, only the first two characters will be taken.

![](/.github/assets/separator.svg)

$\large{\texttt{\color{#8ECAE6}size}}$
![](/.github/assets/tags-integer.svg)
![](/.github/assets/tags-required.svg)

The size of the profile picture, clamped between 16px and 1024px.

## Response

The response is of type ![](/.github/assets/tags-file.svg).
