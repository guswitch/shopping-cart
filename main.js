            // Capturando a div content
            var elContent = document.querySelector('#content');

            // Capturando o Id da tbody de cart
            var tbody = document.querySelector('#cart');

            var elCounter = document.querySelector('#counter');
            var counter = 0;
            elCounter.innerHTML = '('+counter+')';

            var elQtdCart;

             // Elementos do Modal
             var productTitle = document.querySelector('#productTitle');
             var productImg = document.querySelector('#productImg');
             var productPrice = document.querySelector('#productPrice');
             var productQtd = document.querySelector('#productQtd');
             var btnAdd = document.querySelector('#btnAdd');

            var auxDisabled;
            var statusDisabled = document.querySelector('#statusDisabled');

            // Declarando elemento do valor total
            var elFinalPrice = document.querySelector('#elFinalPrice');
            elFinalPrice.style.color = '#218838';           
            
            // Criando array de produtos
            var products = [

                {
                    id: '#594' ,
                    name:'Pera',
                    images:['https://www.mambo.com.br/ccstore/v1/images/?source=/file/v2327891463912467858/products/131582.jpg&height=400&width=400'], 
                    price: 5, 
                    qtd: 3
                }, 

                {
                    id: '#595' ,
                    name:'Banana', 
                    images:['https://static1.conquistesuavida.com.br/ingredients/5/54/26/75/@/24677--ingredient_detail_ingredient-2.png'],
                    price: 4, 
                    qtd: 2
                },

                {
                    id: '#596' ,
                    name:'Morango',
                    images:['https://www.mercafruty.com.br/wp-content/uploads/2016/08/morango-fruta.jpg'], 
                    price: 2, 
                    qtd: 5
                },

                {
                    id: '#597' ,
                    name:'Laranja',
                    images:['https://static3.tcdn.com.br/img/img_prod/450860/muda_de_laranja_bahia_laranja_umbigo_496_2_20190611093556.jpg'], 
                    price: 6, 
                    qtd: 4
                },
            ];

            // Criando array de produtos que estão no carrinho
            var cart = [];

            // Declarando auxiliar do preço
            var aux = 0;

            // Declarando variavel de preço
            var finalPrice = 0;

            
            function renderProducts(){
                for(product of products){
                    var i = products.indexOf(product);

                    // Content do produto
                    var elProd = document.createElement('div');
                    elProd.setAttribute('class','containerProd col-sm-12 col-md-6 col-lg-4 col-lg-2 card border-0')

                    var elProdImage = document.createElement('img');
                    elProdImage.setAttribute('src', products[i].images[0]);
                    elProdImage.setAttribute('class', 'card-img-top');
                    elProdImage.style.height = 300;
                    elProdImage.style.width = 300;  

                    // Label do nome do produto
                    var elProdName = document.createElement('h3');
                    elProdName.appendChild(document.createTextNode(' ' + products[i].name + ' '));

                    // Label do nome do produto
                    var elProdPrice = document.createElement('h5');
                    elProdPrice.appendChild(document.createTextNode(' ' + products[i].price +'R$'));

                    // Botão p/ add o produto ao carrinho
                    var elProdAdd = document.createElement('button');
                    elProdAdd.appendChild(document.createTextNode('Comprar'));
                    elProdAdd.setAttribute('class', 'btnAdd btn btn-success');
                    elProdAdd.setAttribute('data-target', '#productModal');
                    elProdAdd.setAttribute('data-toggle', 'modal');
                    elProdAdd.setAttribute('onclick', 'renderProductDetail('+i+')');

                    // Montando o produto
                    elProd.appendChild(elProdImage);
                    elProd.appendChild(elProdName);
                    elProd.appendChild(elProdPrice);
                    elProd.appendChild(elProdAdd);

                    // Exibindo o produto
                    elContent.appendChild(elProd);
                }
            }

            function renderProductDetail(d){

                clearProductDetail(); 
                
                productTitle.appendChild(document.createTextNode(products[d].name));
                productPrice.appendChild(document.createTextNode(products[d].price + 'R$'));
                productQtd.appendChild(document.createTextNode(products[d].qtd + ' em estoque'));

                
                productImg.setAttribute('src',products[d].images[0]);
                productImg.classList.add('img-fluid');

                btnAdd.setAttribute('onclick', 'addToCart('+d+')');

                if(cart.length > 0){
                    for(product in cart){
                        if(products[d].id == cart[product].id){
                            btnAdd.classList.remove('btn-success');
                            btnAdd.classList.add('btn-danger');
                            btnAdd.innerHTML = '';
                            btnAdd.appendChild(document.createTextNode('Remover do Carrinho'));
                            btnAdd.removeAttribute('onclick');
                            btnAdd.setAttribute('onclick', 'removeOfCart('+product+')');
                        }
                    }
                }

            }

            function clearProductDetail(){
                // Limpando os elementos
                productTitle.innerHTML = '';
                productPrice.innerHTML = '';
                productQtd.innerHTML = '';

                btnAdd.classList.remove('btn-danger');
                btnAdd.classList.add('btn-success');
                btnAdd.innerHTML = '';
                btnAdd.appendChild(document.createTextNode('Adicionar ao Carrinho'));

            }


            function addToCart(t){

                // Adicionando um novo item ao array do cart
                cart.push({id: products[t].id ,name: products[t].name, images: products[t].images, price: products[t].price, qtd: 1 });
            
                counter++;
                elCounter.innerHTML = '('+counter+')';

                // Chamando o metodo de renderização
                renderCart();

                
            }   


            function removeOfCart(k){

                // Excluindo a posição seleconada
                cart.splice(k,1);

                counter--;
                elCounter.innerHTML = '('+counter+')';

                renderCart();
                calculatePurchase();
                
                
            }


            function renderCart(){

                // Chamando metodo para não renderizar as celulas antigas
                noRenderOldCells();

                // Percorrendo cada produto no carrinho
                for(product of cart){

                    // Capturando o indicie de cada produto
                    var j = cart.indexOf(product);

                    var containerElQtdCart = document.createElement('div');
                    containerElQtdCart.classList.add('form-group');
                    elQtdCart = document.createElement('select');
                    elQtdCart.classList.add('customSelect');
                    
                     // Adicionar evento quando houver modificação no campo
                     elQtdCart.addEventListener('change',function(){
                        console.log(elmtsQtdCart);
                        // Exemplo que foi usado como base: https://stackoverflow.com/questions/29320215/get-index-of-input-element-in-javascript

                        // Percorre todos os elementos que tem a classe e atribui a varivel
                        var elmtsQtdCart = document.getElementsByClassName('customSelect');

                        // Coloca todos os elementos dentro desse array(o [].slice retorna um objeto de função ali no caso 
                        // criando um array, e o .call chama a função, no caso ali chama o elmtsQtdCart como se ele fosse um parametro) 
                        // Explicação: https://stackoverflow.com/questions/2125714/explanation-of-slice-call-in-javascript 
                        var setArr = [].slice.call(elmtsQtdCart); 
                        // Percorre o array
                        for( var f in setArr ){
                                // Caso encontre o elemento igual ao elQtdCart executa as funções
                                if(setArr[f] == this){
                                console.log(f);
                                cart[f].qtd = this.value;
                                calculatePurchase();
                            }     
                        }
                    });

                    for(var d=1;d <= products[j].qtd;d++){
                        var elQtdCartOp = document.createElement('option');
                        elQtdCartOp.setAttribute('value', d);
                        elQtdCartOp.appendChild(document.createTextNode(d));

                        //elQtdCart.appendChild(elQtdCartOp);
                        elQtdCart.appendChild(elQtdCartOp);
                    }
                    
                    containerElQtdCart.appendChild(elQtdCart);

                    // Inserindo uma nova linha no tbody a cada item do array
                    var row = tbody.insertRow(-1);

                    // Definindo o alocamento das celulas do tbody
                   var cell1 = row.insertCell(0);
                   var cell2 = row.insertCell(1);
                   var cell3 = row.insertCell(2);
                   var cell4 = row.insertCell(3);
                   var cell5 = row.insertCell(4);

                   // Definindo o conteudo que vai ser alocado nas celulas
                   cell1.innerHTML = '<img src='+cart[j].images+' class="rounded-circle" style="height:30px;width:30px">';
                   cell2.innerHTML = cart[j].name;
                   cell3.innerHTML = cart[j].price + 'R$';
                   cell4.appendChild(containerElQtdCart);
                   cell5.innerHTML = '<i class="fas fa-trash-alt" style="color:red" onclick="removeOfCart('+j+')"></i>';
                                         
                }
                
                // Chamando o metodo de cacular valor final
                calculatePurchase();
            }

            function noRenderOldCells(){
                // Eu  juntei duas maneiras de fazer que vi nesse link: https://stackoverflow.com/questions/7271490/delete-all-rows-in-an-html-table

                // Capturando todas linhas do tbody
                var tableRows = tbody.getElementsByTagName('tr');

                // Contabilizando o total de linhas da tbody
                var rowCount = tableRows.length;
                  
                 // Exclui cada linha pelo metodo de decremento
                for (var x=rowCount; x>0; x--) {
                    tbody.deleteRow(tableRows[x]);
                }

            }

            function calculatePurchase(){
                finalPrice = 0;
                console.clear();
                elFinalPrice.innerHTML = '';
                for(product of cart){  
                    var z = cart.indexOf(product);
                    console.log('preco do produto: ', cart[z].price, ' qtd do produto: ', cart[z].qtd);
                    aux = (cart[z].price * cart[z].qtd);
                    finalPrice += aux;                 
                }   
                console.log('Valor final: ', finalPrice); 
                elFinalPrice.appendChild(document.createTextNode(finalPrice + 'R$'));
            }
            
            renderProducts();