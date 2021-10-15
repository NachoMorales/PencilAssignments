export class Settings {
  // Global Settings
  public static APP_NAME = 'Pencil Frontend Assignment';
  public static APP_VERSION = '0.0.1';

  // EndPoints
  public static endPoints = {

  };

  public static endPointsMethods = {
    
  };

  public static storage = {
    user: 'pencil.user',
  };

  public static routes: any = {
    login: { path: 'login' },
    home: { path: 'home' },
    root: { path: '', redirectTo: 'login', pathMatch: 'full' },
  };
}
