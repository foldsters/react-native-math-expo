#include "HybridMath.hpp"
#include "cutils_wrapper.hpp"
#include <string>
#include <cmath>

namespace margelo::nitro::math {

  double HybridMath::add(double a, double b) {
    return a + b;
  }

  double HybridMath::getPi() {
    return M_PI;
  }

  std::string HybridMath::numberToString(double value) {
    // Allocate a buffer for the string representation
    constexpr int BUFFER_SIZE = 50;
    char buffer[BUFFER_SIZE];
    
    // Call our C utility function
    int result = double_to_string(value, buffer, BUFFER_SIZE);
    
    // Convert to std::string if successful
    if (result >= 0) {
      return std::string(buffer);
    } else {
      return "Error converting number";
    }
  }

}