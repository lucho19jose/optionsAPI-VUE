app.component("product", {
    template:/* vue-html */`
    <section class="product">
      <div class="product__thumbnails">
        <div 
          v-for="(image, index) in product.images"
          :key="image.thumbnail"
          class="thumb"
          :class="{ active: activeImage === index }"
          :style="{backgroundImage: 'url('+ image.thumbnail +')'}"
          @click="activeImage = index"
        >
        </div>
      </div>
      <div class="product__image">
        <img :src="product.images[activeImage].image" :alt="product.name" />
      </div>
    </section>
    <section class="description">
      <h4>{{ product.name.toUpperCase() }} {{ product.stock === 0 ? "😢": "😎" }}</h4>
      <badge :product="product"></badge>
      <p class="description__status" v-if="product.stock<=3 && product.stock >=2">Quedan menos de 3 unidades!</p>
      <p class="description__status" v-if="product.stock<=1">La ultima unidad!!</p>
      <p class="description__status" v-else>hay unidades disponibles</p>
      <p class="description__price" :style="{color:price_color}">S/. {{ new  Intl.NumberFormat("es-PE").format(product.price) }}</p>
      <p class="description__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        atque dolorum corporis, reiciendis eaque temporibus quod magnam amet
        ea natus delectus? Aut placeat ipsam minus labore voluptas. Porro,
        vel aliquid!
      </p>
      <div class="discount">
        <span>Codigo de Descuent:</span>
        <input 
        type="text" 
        placeholder="Ingresa tu codigo"
        @keyup.enter="applyDiscount($event)" />
      </div>
      <button :disabled="product.stock === 0" @click="sendToCart()">Agregar al carrito</button>
    </section>
    `,
    props:["product"],//...options is direct inyected to the context so easy
    emits:["sendtocart"],
    data(){
        return{
              activeImage: 0,
              discountCodes: ["JOSE20", "IOSAMUEL"],
              //price_color: "rgb(104, 104, 209)"
        };
    },
    methods:{
        applyDiscount(event){
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if(discountCodeIndex>=0){
              this.product.price *= 50/100;
              this.discountCodes.splice(discountCodeIndex, 1);
            }
        },
        sendToCart(){
          this.$emit("sendtocart", this.product);
        }
    },
    watch: {/* SEE THE VALUES OF REACTIVE PROPERTY */
      activeImage(value, oldvalue){
        console.log(value, oldvalue);
      },
      /* "product.stock"(stock){
        if(stock <= 1){
          this.price_color = "rgb(188 30 67)";
        }
      }*/
    },
    computed:{
      price_color(){//...are functions and return anything
        if(this.product.stock <= 1){
          return "rgb(188 30 67)"
        }
        return "rgb(104, 104, 209)";
      }
    } 
});