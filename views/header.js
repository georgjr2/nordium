const header = `<style>@media (min-width: 900px) {
    .boxa {
     display: none;
   }
       .boxc {
           display: none;
       }
       header {
     display: grid;
     grid-gap: 5px;
     color: #444;
     align-items: center;
     justify-items: center;
     grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
   }
   .boxbig {
     color: #fff;
     font-size: 12pt;
       }
       a {
           color: white;
           text-decoration: none;
       }
   }
   
   @media (max-width: 899px) {
           header {
     display: grid;
    grid-template-columns: 1fr 1fr 1fr;
     grid-gap: 5px;
     color: #444;
     align-items: center;
     justify-items: center;
           }
   .boxa {
     color: #fff;
     font-size: 26pt;
   }
   .boxc {
     color: #fff;
     font-size: 26pt;
   }
       .boxbig {
           display: none;
       }
   
            
       }
       .img {
        width: 150px;
        height: auto;
    } </style>
<header>
<div class="boxa"><i class="fas fa-angle-left" ></i></div>
<div class="boxbig"><a href="">VÝSKUMNÉ CENTRUM</a></div>
<div class="boxbig"><a href="">SVALBARD</a></div>
<div class="box b"><img class="img" src="Logo.png" /></div>
<div class="boxc"><i class="fas fa-bars"></i></div>
<div class="boxbig"><a href="">SKLADOVACIE PRIESTORY</a></div>
<div class="boxbig"><a href="">KONTAKT</a></div>
</header>
<br>
<br>
<br>
`
export default header
