var cartItens;
function loadProducts()
{
    var saida = '';
    var vitrine = '';
    var products = [];
    var items = [];
    var images = [];
    $.getJSON("data/products.json", function(data) 
      {
        var products = data.products;

        //para cada produto
        for (i = 0; i < products.length; i++) 
        {
            var items = products[i].items; 
            
            if(i < 4)//primeiros 4 itens da vitrine
            {
                vitrine += '<div class="col-sm produto">';//inicio do produto

                //para cada item
                for (j = 0; j < items.length; j++) 
                {
                    var images = items[j].images; 
                    var listPrice = items[j].ListPrice;//preço inicial
                    var price = items[j].ListPrice;// preço
                    var noDiscount = items[j].ListPrice;//preço sem desconto
                    var dozeVezes = noDiscount / 12; //preço em 12x


                   /* for (k = 0; k < images.length; k++) 
                    {
                       var img = images[k].imageUrl;
                    }*/
                     vitrine += '<img src="images/' + images[0].imageUrl + '" class="img-fluid img-produto">';//imagens
                }

                vitrine += '<p><strong>'+ products[i].productName +'</strong><br>';
                vitrine += '<p><strong>500'+' litros </strong><br>';
                vitrine += '<span class="texto-cinza text-uppercase"><small><strong>'+ products[i].productReference +'</strong></small></span></p>';
                vitrine += ' <p><small class="texto-cinza">De: R$ <strike>'+ listPrice +',00</strike></small><br>';
                vitrine += '<span class="preco">R$ ' + price + ',00</span><br>';
                vitrine += '<small class="texto-cinza"><strong>à vista no boleto bancário</strong></small><br>';
                vitrine += '<small class="texto-cinza">ou em até 12x de R$ '+ dozeVezes.toFixed(2) +'</small><br></p>';
                vitrine += '<div class="text-center"><a class="btn text-uppercase  btn-adicionar" onclick="adicionarCarrinho('+ products[i].id +')">';
                vitrine += '<strong>Adicionar ao carrinho</strong></a>';

                vitrine += '</div>';
                vitrine += '</div>';
                
            }
            else{
                saida += '<div class="col-sm produto">';//inicio do produto

                //para cada item
                for (j = 0; j < items.length; j++) 
                {
                    var images = items[j].images; 
                    var listPrice = items[j].ListPrice;//preço inicial
                    var price = items[j].ListPrice;// preço
                    var noDiscount = items[j].ListPrice;//preço sem desconto
                    var dozeVezes = noDiscount / 12; //preço em 12x


                   /* for (k = 0; k < images.length; k++) 
                    {
                       var img = images[k].imageUrl;
                    }*/
                     saida += '<img src="images/' + images[0].imageUrl + '" class="img-fluid img-produto">';//imagens
                }

                saida += '<p><strong>'+ products[i].productName +'</strong><br>';
                saida += '<p><strong>XXX'+' litros </strong><br>';
                saida += '<span class="texto-cinza text-uppercase"><small><strong>'+ products[i].productReference +'</strong></small></span></p>';
                saida += ' <p><small class="texto-cinza">De: R$ <strike>'+ listPrice +',00</strike></small><br>';
                saida += '<span class="preco">R$ ' + price + ',00</span><br>';
                saida += '<small class="texto-cinza"><strong>à vista no boleto bancário</strong></small><br>';
                saida += '<small class="texto-cinza">ou em até 12x de R$ '+ dozeVezes.toFixed(2) +'</small><br></p>';
                saida += '<div class="text-center"><a class="btn text-uppercase btn-adicionar" onclick="adicionarCarrinho('+ products[i].id +')">';
                saida += '<strong>Adicionar ao carrinho</strong></a>';

                saida += '</div>';
                saida += '</div>';
            }

          }

        document.getElementById('tela').innerHTML = saida;
        document.getElementById('top').innerHTML = vitrine;
    });
    
}

function adicionarCarrinho(id)
{
    $.getJSON("data/products.json", function(data) 
      {
        var products = data.products;

        //para cada produto
        for (i = 0; i < products.length; i++) 
        {
            var items = products[i].items; 
                //para cada item
                for (j = 0; j < items.length; j++) 
                {
                    //verificar se esse é o item que eu preciso
                    if(products[i].id == id)
                    {
                        //se sim, verificar se já existe um item no carrinho
                        var carrinho = getCookie("carrinho");
                          var images = items[0].images;
                        if(carrinho == "")
                           {
                            
                               
                                var json = '{"itens":[{ "id":"' + products[i].id + '", "nome":"' + products[i].productName + '", "valor": "' + items[j].ListPrice + '", "qtde": 1 , "img":"'+ images[0].imageUrl +'" }]}';
                                setCookie("carrinho", json);
                           }
                        else{
                             
                            var json = '{ "id":"' + products[i].id + '", "nome":"' + products[i].productName + '", "valor": "' + items[j].ListPrice + ',00", "qtde": 1, "img":"'+ images[0].imageUrl + '" }';
                            json2 = JSON.parse(json);
                            var obj = JSON.parse(carrinho);
                            obj['itens'].push(json2);
                            var jsonStr = JSON.stringify(obj);
                            setCookie("carrinho", jsonStr);
                           
                            
                        }
                        
                        preencherCarrinho();  
                        break;
                    }         
                }
            
        }
                        
    });
   
}

function preencherCarrinho()
{
    //var stringCarrinho = 
   // var itemCarrinho = '';
    var html = '';
    var itens = [];
    var images = [];
    var carrinho = JSON.parse(getCookie("carrinho"));
    
    
    
        var produto = carrinho.itens;
        
        var total = 0;

        //para cada produto no carrinho
        for (i = 0; i < produto.length; i++) 
        {
            var images = produto[i].img;
                    var idProduto = produto[i].id; 
                    var nomeProduto = produto[i].nome;//preço inicial
                    var valorProduto = produto[i].valor;// preço
                    valorProduto = parseInt(valorProduto).toFixed(2); 
                    var qtdeProduto = produto[i].qtde;//preço sem desconto
                    //var imgProduto = images[0].imageUrl;//img
            //alert(imgProduto);
            
            html = html + '<div class=" dropdown-item container-fluid carrinho"><div class="row"><div class="col-2 margin-auto" ><img src="images/'+ images +'" class="img-fluid " width="200px" /></div><div class="col-6 text-truncate margin-auto"><br><p class="cart-txt wrap-txt">'+ nomeProduto +'<br>Quantidade:' +qtdeProduto + '</p><p class="cart-txt wrap-txt"></p></div><div class="col-1 margin-auto"><div class="vl"></div> </div><div class="col-3 cart-txt margin-auto"><br><p>R$ '+ valorProduto +'</p></div></div></div><div class="dropdown-divider"></div>';
            var total = parseInt(total) + parseInt(valorProduto);   
            total = total.toFixed(2);
            
                }
    
    
    html = html + '<div class="dropdown-item container-fluid"><div class="row"><div class="col-9 cart-txt"><strong >Subtotal</strong> (frete não incluso):</div><div class="col-3 margin-auto cart-txt">R$ '+ total +'</div></div></div><div class="dropdown-divider"></div><div class="text-center "><a class="btn text-uppercase btn-comprar text-dark margin-auto"><strong>Comprar</strong></a></div>';
    
    setCookie("itensCarrinho", html);
 
    
}

function loadCarrinho()
{
    
    var html = getCookie("itensCarrinho");
    if(html != ""){
        document.getElementById('carrinho').innerHTML = html;  
    }
    
    
}

               





/*Cookies*/
function setCookie(cname,cvalue,exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) 
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}