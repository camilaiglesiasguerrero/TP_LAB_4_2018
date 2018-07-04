import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  logueado : boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router) { 
    }

  ngOnInit() {
    
  }

  irA(donde : number){
    switch(donde){
    case 1:
      this.router.navigate(['/Principal']);
      break;
    case 2:
      try 
      {
        localStorage.setItem('token', null);
        this.logueado = false;
        this.router.navigate(['/Principal']);
      } 
      catch (error) 
      {
        return false;
      }
      break;
    }
    
  }

}
