package me.lxxzdrgnl.springbootdeveloper.service;

import lombok.RequiredArgsConstructor;
import me.lxxzdrgnl.springbootdeveloper.config.jwt.TokenProvider;
import me.lxxzdrgnl.springbootdeveloper.domain.User;
import me.lxxzdrgnl.springbootdeveloper.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class TokenService {

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    public String createNewAccessToken(String refreshToken) {
        if (!tokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected token");
        }

        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
        User user = userService.findById(userId);

        return tokenProvider.generateToken(user, Duration.ofHours(2));
    }
}