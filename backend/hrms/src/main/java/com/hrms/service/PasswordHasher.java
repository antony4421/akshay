package com.hrms.service;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHasher {

    // Hash the password before storing it in the database
    public static String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(10));
    }

    // Verify the password during login
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}
