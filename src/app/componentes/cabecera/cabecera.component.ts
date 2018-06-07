import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
  }

  irA(donde : number){
    switch(donde){
      case 1:
        this.router.navigate(['']);
        break;
      case 4:
      case 5:
        this.router.navigate(['/Ingresar']);
        break;
    }
  }

}
