/**
 * @file utils.c
 * @brief Implementation of utility functions for mathematical operations
 */

 #include "utils.h"
 #include <stdio.h>
 #include <string.h>
 #include <math.h>
 
 /**
  * Converts a double value to its string representation with appropriate formatting
  * - Uses scientific notation for very large or small numbers
  * - Includes trailing zeros for integer values
  * - Handles special cases like infinity and NaN
  */
 int double_to_string(double value, char* buffer, int buffer_size) {
     if (buffer == NULL || buffer_size <= 0) {
         return -1;
     }
     
     // Handle special cases
     if (isnan(value)) {
         if (buffer_size < 4) return -1;
         strncpy(buffer, "NaN", buffer_size);
         buffer[buffer_size-1] = '\0';
         return 3;
     }
     
     if (isinf(value)) {
         const char* inf_str = value > 0 ? "Infinity" : "-Infinity";
         size_t len = strlen(inf_str);
         if (buffer_size <= (int)len) return -1;
         strncpy(buffer, inf_str, buffer_size);
         buffer[buffer_size-1] = '\0';
         return (int)len;
     }
     
     // Format based on magnitude
     double abs_value = fabs(value);
     int chars_written;
     
     if (abs_value == 0.0) {
         // Handle zero
         chars_written = snprintf(buffer, buffer_size, "0.0");
     } else if (abs_value < 0.0001 || abs_value >= 10000000.0) {
         // Scientific notation for very small or large numbers
         chars_written = snprintf(buffer, buffer_size, "%.6e", value);
     } else if (floor(value) == value) {
         // Integer value (with .0 suffix)
         chars_written = snprintf(buffer, buffer_size, "%.1f", value);
     } else {
         // Regular floating point with 6 decimal places
         chars_written = snprintf(buffer, buffer_size, "%.6f", value);
         
         // Trim trailing zeros, but keep one decimal place
         if (chars_written > 0 && chars_written < buffer_size) {
             int i = chars_written - 1;
             while (i > 0 && buffer[i] == '0' && buffer[i-1] != '.') {
                 i--;
             }
             if (i < chars_written - 1) {
                 buffer[i+1] = '\0';
                 chars_written = i + 1;
             }
         }
     }
     
     return (chars_written >= buffer_size) ? -1 : chars_written;
 }
 
 