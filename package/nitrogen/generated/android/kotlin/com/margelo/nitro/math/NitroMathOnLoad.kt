///
/// NitroMathOnLoad.kt
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

package com.margelo.nitro.math

import android.util.Log

internal class NitroMathOnLoad {
  companion object {
    private const val TAG = "NitroMathOnLoad"
    private var didLoad = false
    /**
     * Initializes the native part of "NitroMath".
     * This method is idempotent and can be called more than once.
     */
    @JvmStatic
    fun initializeNative() {
      if (didLoad) return
      try {
        Log.i(TAG, "Loading NitroMath C++ library...")
        System.loadLibrary("NitroMath")
        Log.i(TAG, "Successfully loaded NitroMath C++ library!")
        didLoad = true
      } catch (e: Error) {
        Log.e(TAG, "Failed to load NitroMath C++ library! Is it properly installed and linked? " +
                    "Is the name correct? (see `CMakeLists.txt`, at `add_library(...)`)", e)
        throw e
      }
    }
  }
}
