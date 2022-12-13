# :pencil2: Projeto Saas (Software as a service / Software como um serviço) B7DELIVERY :computer:

# :clipboard: Pontos importantes do projeto :clipboard: :

## Start Project:

```markdown
npm i

npm run dev
```

Sistema de Delivery

* Pessoas que vão utilizar esse sistema:

- Usuário Final.
- O estabelecimento.
- Admin do sistema.

![img](./README/mapaMental.png)

* Telas:

- Home (Listagem de promoções e produtos)
- Página do produto específico
- Carrinho de compras
- Checkout (para logado)
- Cadastro de endereços
- Login/Cadastro
- Lista de pedidos
- Pedido individual

![img](./README/mapaMental2.png)

- Login/Cadastro para estabelecimento
- Listagem de pedidos
- Edição de pedidos
- Listagem de produtos
- Edição de produtos

![img](./README/mapaMental3.png)

- Listagem de estabelecimentos
- Edição de estabelecimentos

![img](./README/mapaMental4.png)

* Definir as tecnologias:

- NextJS (com SSR)
- Prisma (ORM)
- MySQL / PostgreSQL
- API RESTful
- Typescript

* Análise do layout e divisão de componentes que se repete:

Link do layout: https://www.figma.com/file/6M8Pq62vm6QYPqTsYJBCmf/Ui---B7Delivery?node-id=403%3A14

- Banner.

![img](./README/Banner.png)

Elemento que possui um carrossel contendo banners publicitários do cliente.

- Button.

![img](./README/Buttons.png)

- HeadComponent.
- Header.

![img](./README/Header.png)

O elemento Header contém os elementos da parte superior do site para cada página.

- Input.

![img](./README/Inputs.png)

Elemento comum em quase todas as páginas e livre para adaptações, respeitando assim o layout pré-estabelecido.

- ProductItem.

![img](./README/ProductItems.png)

O elemento que contém a imagem, preço e categoria dos produtos que o cliente oferece.

- SearchInput.

![img](./README/SearchInput.png)

O elemento que contém o input principal de pesquisa.

- Icon.

![img](./README/EmailIcon.png)

O elemento Icon contém um icone que pode ser alterado informações importantes.

- Quantity.

![img](./README/QuantityElement.png)

Elemento que desempenha o papel de alterar a quantidade de produto que o usuário deseja.

- SideBar.

![img](./README/SideBar.png)

Simplesmente o menu lateral.

- SideBarMenuItem.

![img](./README/SideBarElement.png)

As opções do menu.

* Páginas:

- Home:

![img](./README/Home.png)

- Login:

![img](./README/Login.png)

- Meus Endereços:

![img](./README/My.png)

- SignUp:

![img](./README/SignIn.png)

- Esqueceu Senha:

![img](./README/forget.png)

- Alteração da senha com sucesso:

![img](./README/DeuCerto.png)

- Checkout:

![img](./README/.png)

- Minicart/Cart:

![img](./README/Minicart.png)

- PDP/(Página do Produto):

![img](./README/PDP.png)

* Alterações no projeto: