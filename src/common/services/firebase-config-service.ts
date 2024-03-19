import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

export class FirebaseConfigService {
  public static auth = getAuth();
  public static db = getFirestore();
}
