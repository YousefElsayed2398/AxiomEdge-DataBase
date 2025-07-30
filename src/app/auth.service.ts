import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
    access_token: string;
}

interface RegisterResponse {
    message: string;
    username: string;
}

interface User {
    userId: number;
    username: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:3000/auth';
    private tokenKey = 'access_token';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        // Check if user is already logged in
        this.loadTokenFromStorage();
    }

    register(username: string, password: string): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, {
            username,
            password
        });
    }

    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {
            username,
            password
        }).pipe(
            tap(response => {
                if (response.access_token) {
                    this.setToken(response.access_token);
                    this.loadUserProfile();
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;

        // Check if token is expired (basic check)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch {
            return false;
        }
    }

    getProfile(): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/profile`);
    }

    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    private loadTokenFromStorage(): void {
        if (this.isLoggedIn()) {
            this.loadUserProfile();
        }
    }

    private loadUserProfile(): void {
        this.getProfile().subscribe({
            next: (user) => {
                this.currentUserSubject.next(user);
            },
            error: () => {
                this.logout();
            }
        });
    }
}
