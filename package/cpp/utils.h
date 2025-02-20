/**
 * @file utils.h
 * @brief Utility functions for mathematical operations
 */

 #ifndef UTILS_H
 #define UTILS_H
 
 /**
  * @brief Converts a double value to its string representation
  * 
  * @param value The double value to convert
  * @param buffer Buffer to store the resulting string
  * @param buffer_size Size of the buffer
  * @return int Number of characters written (excluding null terminator), or -1 on error
  */
 int double_to_string(double value, char* buffer, int buffer_size);
 
 #endif /* UTILS_H */