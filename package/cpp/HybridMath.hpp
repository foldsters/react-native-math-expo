#pragma once

#include "HybridMathSpec.hpp"
#include <string>

namespace margelo::nitro::math {

  class HybridMath: public HybridMathSpec {
    public:
      HybridMath(): HybridObject(TAG) { }
      double add(double a, double b) override;
      double getPi() override;
      std::string numberToString(double value) override;
  };

} // namespace margelo::nitro::math